// 循环引用问题 如果当前这个对象已经被拷贝过了 就不要拷贝了
let b = {}
let a = {b: b}
b.a = a

let obj = {name: 'zf', age: { val: 10 }}

// 深拷贝 1. 考察当前数据类型校验 2. 循环引用问题
// typeof Object.prototype.toString.call instanceof constructor

function deepClone(value, hash = new WeakMap) {
  if (value == undefined) return value
  // typeof 不是对象就是 string number boolean function
  if (typeof value !== 'object') return value
  if (value instanceof RegExp) return new RegExp(value)
  if (value instanceof Date) return new Date(value)
  let v = hash.get(value)
  if (v) return v // 如果映射表中有 直接返回拷贝后的结果
  // 对象 数组 拷贝 {} []
  // 这个instance就是拷贝后的结果 我希望把它先存起来，下次如果再拷贝直接返回就好了
  let instance = new value.constructor // new Object / new Array
  hash.set(value, instance) // 将拷贝前的和拷贝后的做一个映射表
  for (let key in value) { // 将当前对象中的数据拷贝到新的对象中
    if (value.hasOwnProperty(key)) { // 不拷贝原型链上的属性
      instance[key] = deepClone(value[key], hash)
    }
  }
  return instance
}
let newObj = deepClone(obj)
obj.age.val = 18
console.log(newObj)
let newObj1 = deepClone(a)
console.log(newObj1) // string number 基础类型 function函数 拷贝的是对象(正则 日期。。。)或者数组 undefined null
