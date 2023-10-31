/*
 * @Description: 通用方法
 * @Author: yuanzeyu
 * @Date: 2023-10-30 23:41:10
 * @LastEditTime: 2023-10-31 11:39:31
 */

export const handleHash = (data) => {
  if (data) {
    const start = data.substring(0, 4);
    const end = data.substring(data.length - 4, data.length);
    return `${start}-${end}`;
  }
  // else {
  //   return '--'
  // }
};
