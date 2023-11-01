/*
 * @Description: 通用方法
 * @Author: yuanzeyu
 * @Date: 2023-10-30 23:41:10
 * @LastEditTime: 2023-11-01 09:27:52
 */
import Clipboard from 'clipboard';
import moment from 'moment';
import { message } from 'ant-design-vue';

// 处理hash的格式
export function handleHash(data) {
  if (data) {
    const start = data.substring(0, 4);
    const end = data.substring(data.length - 4, data.length);
    return `${start}-${end}`;
  } else {
    return '--';
  }
}
// 处理时间格式
export function handleTime(time, format = 'MM/DD/yyyy H:mm:ss') {
  const date = moment.unix(time);
  const formattedDate = date.format(format);
  return formattedDate;
}
//
export function handleNum(value) {
  return value.toLocaleString();
}

export function copyValue(element, key, data) {
  let value = data[key];
  const clipboard = new Clipboard(element, {
    text: () => value,
  });
  console.log(element, clipboard);
  clipboard.on('success', (e) => {
    console.log('复制成功');
    this.$message.info({
      content: '复制成功',
      icon: 'none',
    });
    e.clearSelection();
    clipboard.destroy();
    console.log('success', clipboard);
  });

  clipboard.on('error', (e) => {
    console.log('复制失败', e);
    this.$message.info({
      content: '复制失败',
      icon: 'none',
    });
    clipboard.destroy();
    console.log('error', clipboard);
  });
  // clipboard.onClick({ target: document.querySelector(element) });
}

export function copySuccess(e) {
  console.log('success', e);
  message.info('Copy To Clipboard');
}

export function copyError(e) {
  console.log('fail', e);
  message.error('Copy Fail');
}

export function updateDuration(timestamp) {
  const currentTime = moment();
  const targetTime = moment.unix(timestamp);
  const diff = moment.duration(currentTime.diff(targetTime));
  const duration = moment.utc(diff.asMilliseconds()).format('HH:mm:ss');

  return duration;
}
