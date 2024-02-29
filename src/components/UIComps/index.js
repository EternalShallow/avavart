/*
 **注册UI组件
 */
import { defineAsyncComponent } from 'vue'
const componentsFile = import.meta.glob('./**/*.vue') // 异步方式
// import copy from './Directive/copy'
const components = {
  install: app => {
    for (const [key, value] of Object.entries(componentsFile)) {
      const name = key.split('/')[1].split('.')[0]
      console.log(name, key)
      app.component(name, defineAsyncComponent(value))
    }
    // console.log(copy)
    // app.directive('copy', copy)
  }
}
export default components
