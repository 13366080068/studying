// 1. call的特点 改变this指向 2. 可以让函数执行
Function.prototype.call = function (thisValue, ...args) {
  // this = fn
  if (typeof thisValue !== 'object') {
    thisValue = new Object(thisValue)
  }
  let context = this // context 就是fn
  thisValue.f = context
  Object.defineProperty(thisValue, 'f', { // 可以通过defineProperty 设置属性为不可枚举
    enumerable: false,
    get() {
      return context
    }
  })
  thisValue.f(...args) // 就是将当前的this 挂载到需要改变的this指向上
  delete thisValue.f
}
function fn(...args) {
  console.log(this, args)
}
fn.call(1,3,4,5,6) // [Number: 1] [ 3, 4, 5, 6 ]

function fn0() {
  console.log('fn0')
}
// 以下是call方法.call(this)
fn.call.call.call.call(fn0) // fn0

// apply 和 call的区别主要是在参数上 apply 可以传递数组
Function.prototype.apply = function (thisValue, args) {
  // this = fn
  if (typeof thisValue !== 'object') {
    thisValue = new Object(thisValue)
  }
  let context = this // context 就是fn
  thisValue.f = context
  Object.defineProperty(thisValue, 'f', { // 可以通过defineProperty 设置属性为不可枚举
    enumerable: false,
    get() {
      return context
    }
  })
  thisValue.f(...args) // 就是将当前的this 挂载到需要改变的this指向上
  delete thisValue.f
}
function fn1() {
  console.log(this, arguments)
}
fn1.apply = function() {
  console.log('inner apply')
}
Function.prototype.apply.call(fn1, 1, [2,3,4]) // call先把this指向fn1，再把1,[2,3,4]传给apply
Reflect.apply(fn1, 1, [2,3,4]) // 结果同上一行
