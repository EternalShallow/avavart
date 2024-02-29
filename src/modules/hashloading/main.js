import { createVNode, render } from 'vue'
import toastComponent from './dialog'

const div = document.createElement('div')
document.body.appendChild(div)

let vnode = null
export default {
  checkHash (option) {
    render(null, div)
    vnode = createVNode(toastComponent, option)
    render(vnode, div)
  }
}
