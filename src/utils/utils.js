/*
 * @Description: 通用方法
 * @Author: yuanzeyu
 * @Date: 2023-10-30 23:41:10
 * @LastEditTime: 2023-11-01 15:00:11
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
  }
  return '--';
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
  const targetElement = document.querySelector(element);
  const clipboard = new Clipboard(targetElement, {
    text: () => value,
  });
  clipboard.on('success', (e) => {
    message.info('复制成功');
    e.clearSelection();
    clipboard.destroy();
    console.log('success', clipboard);
  });

  clipboard.on('error', (e) => {
    message.info('复制失败');
    clipboard.destroy();
    console.log('error', e);
  });
}
// 复制到剪贴板
export async function copyTextToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    message.info('Copy To Clipboard');
    console.log('Text copied to clipboard');
  } catch (err) {
    message.error('Copy Fail');
    console.error('Failed to copy text: ', err);
  }
}

export function updateDuration(timestamp) {
  const currentTime = moment();
  const targetTime = moment.unix(timestamp);
  const diff = moment.duration(currentTime.diff(targetTime));
  const duration = moment.utc(diff.asMilliseconds()).format('HH:mm:ss');

  return duration;
}
