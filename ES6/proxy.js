// proxy 代理 + reflect 反射 es6语法
let obj = {
  a: 1,
  b: 2,
  c: { c: 1 }
}
obj = [1, 2, 3]

const update = () => {
  console.log('Update')
}

let handler = {
  get(target, key){ // Reflect能反射13种
    // return target[key]
    if (typeof target[key] === 'object') {
      // 映射表
      return new Proxy(target[key], handler)
    }
    return Reflect.get(target, key)
  },
  set(target, key, value){
    // target[key] = value
    // return true
    let oldValue = target[key]
    if (oldValue !== value) {
      update()
      return Reflect.set(target, key, value)
    }
    return true
  }
}
let proxy = new Proxy(obj, handler)
// 不需要掌握更新值的api
// proxy.c.c = 200
// proxy.push('123')
// proxy.length = 100
proxy.d = 100
console.log(proxy)

// 以后所有对象方法都会放到Reflect上
// let obj1 = Object.freeze({ a: 1 })
// let flag = Reflect.defineProperty(obj1, 'c', {
//   get() {
//     return 100
//   }
// })
// console.log(flag)
