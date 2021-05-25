/*
 * @Description:
 * @Version: 1.0
 * @Autor: yanxin
 * @Date: 2019-12-16 21:10:33
 * @LastEditors: yanxin
 * @LastEditTime: 2020-12-29 14:47:40
 */
import axios from "axios";
import { message } from "ant-design-vue";
import { getToken, TokenKey, removeToken } from "@/utils/auth";
import Qs from "qs";
// 创建
console.log(process.env);
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 20000, // 请求超时
  paramsSerializer: function (params: any) {
    //get请求传数组时序列化
    return Qs.stringify(params, { arrayFormat: "repeat" });
  },
});

// 请求拦截器
service.interceptors.request.use(
  (config: any) => {
    config.headers[TokenKey] = getToken() || "";
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response: any) => {
    const res = response.data;
    if (res.code !== 0 && res.code !== 200) {
      if (res.code == 401) {
        removeToken();
        // 每次手动关闭所有弹框
        message.destroy();
      }
      message.error({
        content: res.message || res.msg || "Error",
        duration: 2 * 1000,
      });

      return Promise.reject(res.message || res.msg || "Error");
    } else {
      return res.data;
    }
  },
  (error: any) => {
    console.log(error);
    message.error({
      message: error.message,
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  }
);

export default service;
