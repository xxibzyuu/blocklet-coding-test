/*
 * @Description: 通用方法
 * @Author: yuanzeyu
 * @Date: 2023-10-30 23:41:10
 * @LastEditTime: 2023-10-31 16:03:41
 */
import Clipboard from 'clipboard';
import moment from 'moment';

export function handleHash(data) {
  if (data) {
    const start = data.substring(0, 4);
    const end = data.substring(data.length - 4, data.length);
    return `${start}-${end}`;
  }
};

export function copyValue(element, key, data) {
  let value = data[key];
  const clipboard = new Clipboard(element, {
    text: () => value,
  });

  clipboard.on('success', () => {
    console.log('复制成功');
    clipboard.destroy();
  });

  clipboard.on('error', () => {
    console.log('复制失败');
    clipboard.destroy();
  });

  clipboard.onClick({ target: document.querySelector(element) });
};

export function updateDuration(timestamp) {
  const currentTime = moment();
  const targetTime = moment.unix(timestamp);
  const diff = moment.duration(currentTime.diff(targetTime));
  const duration = moment.utc(diff.asMilliseconds()).format('HH:mm:ss');

  return duration
}
