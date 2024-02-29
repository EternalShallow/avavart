import router from './router'
import Config from './util/config'
// import NProgress from 'nprogress'
// import 'nprogress/nprogress.css'
// import { isMobile } from "@/util/main.js";
import store from '@/store'

router.beforeEach(async (to, from, next) => {
  let {query} = to
  let {language, scode, locale} = query
  language = locale || language
  if (language) {
    let i = Config.languages.find(e => e.local === language)
    console.log(i)
    if (i) {
      localStorage.setItem('locale', language)
    } else {
      localStorage.setItem('locale', 'en')
    }
  }

  // if (scode) {
  //   localStorage.setItem('shareCode', scode)
  //   await store.commit('system/SET_URL_SCODE', scode)
  // }

  // // 移动端pc端切换
  // if (isMobile()) {
  //   if (to.path.indexOf('/mobile') < 0) {
  //     next({ path: '/mobile', query})
  //   } else {
  //     next()
  //   }
  // } else {
  //   if (to.path.indexOf('/mobile') >= 0) {
  //     next({ path: '/', query})
  //   } else {
  //     next()
  //   }
  // }
  next()
})

router.afterEach(() => {
})
