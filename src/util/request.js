import axios from "axios";
import {getCookie, setCookie} from "./cookie";
const service = axios.create({
  // baseURL: '/api',
  timeout: 30 * 1000,
});
service.interceptors.request.use(
  (config) => {
    console.log(config)
    config.headers["Content-Type"] = "application/json;charset=UTF-8;charset=UTF-8";
    if (config.url.indexOf('/login') > -1) {
      // config.headers["Authorization"] = getCookie("authorization")
      config.headers["authorization"] = getCookie("authorization")
    }
    return config;
  },
  (error) => {
    console.log("intercepter .config error = ", error);
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    // console.log('intercepter response = > ',response.data)
    console.log(response.headers["authorization"])
    if (response.headers["authorization"]){
      setCookie('authorization', response.headers["authorization"])
    }
    const res = response.data;
    return res;
  },
  (error) => {
    //网络请求失败等
    console.log("request error = ", error);
    return Promise.reject(error);
  }
);

export default service;
