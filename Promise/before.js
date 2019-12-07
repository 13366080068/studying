// 希望在原有功能上增加一些方法
// Vue.mixin

function say(who) {
  console.log(who + 'Say')
}
Function.prototype.before = function (callback) {
  // this = say
  return (...args) => {
    callback()
    this(...args)
  }
}
let fn = say.before(function () { // AOP 面向切片
  console.log('before say')
})

fn('Puppey')

// vue中的数组方法重写 函数劫持

// AOP切片

// 当我调用数组的push方法时，先打印调用了push方法
let arr = [1,2,3]
let oldPush = Array.prototype.push
function push (arr, ...args) {
  console.log('调用了push方法')
  oldPush.call(arr, ...args) // arr.push(1,2,3,4)
}
push(arr,4,4,5)
console.log(arr)
