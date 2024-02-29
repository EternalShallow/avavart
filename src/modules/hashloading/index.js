import Confirm from './main'

export default {
  install(app) {
    app.config.globalProperties.$hashchecking = Confirm.checkHash
  }
}
