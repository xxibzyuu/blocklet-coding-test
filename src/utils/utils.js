/*
 * @Description: 通用方法
 * @Author: yuanzeyu
 * @Date: 2023-10-30 23:41:10
 * @LastEditTime: 2023-10-31 22:52:51
 */
import Clipboard from 'clipboard';
import moment from 'moment';
import { message } from 'ant-design-vue';

export function handleHash(data) {
  if (data) {
    const start = data.substring(0, 4);
    const end = data.substring(data.length - 4, data.length);
    return `${start}-${end}`;
  }else {
    return '--'
  }
};

export function copyValue(element, key, data) {
  let value = data[key];
  const clipboard = new Clipboard(element, {
    text: () => value,
  });
  console.log(element, clipboard)
  clipboard.on('success', (e) => {
    console.log('复制成功');
    this.$message.info({
      content: '复制成功',
      icon: "none"
    })
    e.clearSelection();
    clipboard.destroy();
    console.log('success',clipboard)
  });

  clipboard.on('error', (e) => {
    console.log('复制失败',e);
    this.$message.info({
      content: '复制失败',
      icon: "none"
    })
    clipboard.destroy();
    console.log('error',clipboard)
  });
  // clipboard.onClick({ target: document.querySelector(element) });
};

export function copySuccess(e) {
  message.info('Copy To Clipboard')
}

export function copyError(e) {
  console.log('fail', e)
  message.error('Copy Fail')
}

export function updateDuration(timestamp) {
  const currentTime = moment();
  const targetTime = moment.unix(timestamp);
  const diff = moment.duration(currentTime.diff(targetTime));
  const duration = moment.utc(diff.asMilliseconds()).format('HH:mm:ss');

  return duration
}
