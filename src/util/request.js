import axios from "axios";
// import store from '../store'
//import Config from '../utils/config'
import { hex_md5 } from "@/modules/md5";
import Base64 from "../modules/base64";

const service = axios.create({
  //baseURL: Config.ajaxUrl,
  timeout: 30 * 1000,
});

service.interceptors.request.use(
  (config) => {
    // console.log(config)
    config.headers["Content-Type"] = "application/json";
    let theParams = config.data;
    theParams["SIGN"] = hex_md5(new Date().getTime()).toUpperCase();

    if (config.signVeVote) {
      let sign = make_sign(theParams, false, '[tt_vote_api_dsdh5481_2023.09.08]');
      if (sign !== "") {
        theParams["sign"] = sign;
      }
      config.data = theParams;
      // console.log(JSON.stringify(theParams))
    } else if (config.signValidate) {
      config.headers["Content-Type"] = "multipart/form-data";
      let sign = make_sign(theParams);
      if (sign !== "") {
        theParams["sign"] = sign;
      }
      let formData = new FormData();
      formData.append("data", JSON.stringify(theParams));
      // console.log(JSON.stringify(theParams))
      config.data = formData;
    } else {
      config.headers["Content-Type"] = "application/json";
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
    const res = response.data;
    return res;
  },
  (error) => {
    //网络请求失败等
    console.log("request error = ", error);
    // Message({
    //   message: error.message,
    //   type: 'error',
    //   duration: 5 * 1000
    // })
    return Promise.reject(error);
  }
);

export default service;

function make_sign(dict, signValidateWtt, theKey) {
  let encryption_key = signValidateWtt
    ? "[tdex_newuser_2022.8.23]"
    : "[NFT_2023.03.17]";
  if (theKey) {
    encryption_key = theKey
  }
  console.log(encryption_key)

  if (encryption_key == "") return "";

  if (dict["sign"]) delete dict["sign"];

  let str = json_sort(dict);
  str += "&key=" + encryption_key;
  // console.log(str)
  let data = Base64.encode(str);
  // ca.log(data);
  return hex_md5(data).toUpperCase();
}

function json_sort(dict) {
  let arr = [];
  for (let key in dict) {
    arr.push(key);
  }
  arr.sort();
  let str = "";
  for (let i in arr) {
    // console.log(dict[arr[i]])
    str += arr[i] + "=" + dict[arr[i]] + "&";
  }
  return str.substr(0, str.length - 1);
}
