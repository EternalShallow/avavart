import Message from './message.js'

export default {
  install(app) {
    app.config.globalProperties.$message = Message // 原型函数
  }
}
