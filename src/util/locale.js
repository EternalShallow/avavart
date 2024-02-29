export class PageLocales {
  constructor() {
  }

  getItem (key, users) {
    let tmp = this.getLocalArray(key)
    // console.log(tmp)
    return tmp[users]
  }

  setItem (key, users, val) {
    let tmp = this.getLocalArray(key)
    tmp[users] = val
    // console.log(JSON.stringify(tmp))
    localStorage.setItem(key, JSON.stringify(tmp))
  }

  getLocalArray (key) {
    let tmp = localStorage.getItem(key) || '{}'
    try {
      tmp = JSON.parse(tmp)
    } catch (e) {
      tmp = {}
    }
    if (!this._is(tmp, 'Object')) {
      tmp = {}
    }
    return tmp
  }

  _is (obj, type) {
    return type === Object.prototype.toString.call(obj).slice(8, -1)
  }
}
