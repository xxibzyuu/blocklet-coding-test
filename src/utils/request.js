/*
 * @Description: 封装axios
 * @Author: yuanzeyu
 * @Date: 2023-10-30 17:22:56
 * @LastEditTime: 2023-10-31 18:44:45
 */

import axios from 'axios';

// baseURL依据开发环境和生产环境修改
const instance = axios.create({
  timeout: 10000,
  baseURL: 'https://blockchain.info',
});

instance.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    // 如果返回的状态码为 200，说明接口请求成功，可以正常拿到数据，否则的话抛出错误
    if (response.status === 200) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  (error) => {
    const { response } = error;
    if (response) {
      // 请求已发出，但是不在 2xx 的范围
      errorHandle(response.status, response.data.message);
      return Promise.reject(response);
    } else {
      // 超时提示
      if (error.message.includes('timeout')) {
        this.$message.alert('请求超时，请稍后重试', '提示', {
          lockScroll: true,
          confirmButtonText: '确定',
          closeOnClickModal: false,
          closeOnPressEscape: false,
        });
        return Promise.reject(error);
      }
    }
  }
);

const errorHandle = (status, other) => {
  // 状态码判断
  switch (status) {
    case 400:
      this.$message.error('请求错误')
      break;
    case 403:
      this.$message.error('权限不足，拒绝访问')
      break;
    case 404:
      this.$message.error('请求的资源不存在或请求地址出错')
      break;
    case 500:
      this.$message.error('服务器错误')
      break;
    default:
      console.log(other);
  }
};


export default instance