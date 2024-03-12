import Config from "@/util/config.js";
import request from '@/util/request.js'
//推特认证接口
export function getTwitterJumpUrl () {
  return request({
    url: Config.requestUrl + '/twitter/auth',
    // url: '/twitter/auth',
    method: "get",
  })
}
//登录接口
export function callback (oauth_token, oauth_verifier) {
  return request({
    url: Config.requestUrl + `/callback?oauth_token=${oauth_token}&oauth_verifier=${oauth_verifier}`,
    // url: '/twitter/auth',
    method: "get",
  })
}
//登录接口
export function login () {
  return request({
    url: Config.requestUrl + '/login',
    // url: '/twitter/auth',
    method: "post",
  })
}
