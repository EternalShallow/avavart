import { createVNode, render } from 'vue'
import toastComponent from './Toast.vue'

const div = document.createElement('div')
document.body.appendChild(div)

export default ({ text, type = 'info', duration = 2000 }) => {
  let timer = null
  const vnode = createVNode(toastComponent,{
    text: text, // 文本内容
    type: type // 类型
  })
  //把虚拟的节点渲染到页面的DOM中即可
  // render函数的参数
  //参数一：表示表示需要渲染的内容（虚拟节点）
  // 参数二：表示渲染的目标位置 （DOM元素）
  render(vnode, div)
  // 希望1s后消失
  if (timer) {
    clearTimeout(timer)
  }
  timer = setTimeout(() => {
    render(null, div)
  }, duration)
}
