// 解构赋值 结构相同可以把解构中的数据获取到
// 剩余运算符，只能用到最后一个参数中
// let [, ...args] = [1, 2, 3]
// console.log(args)
// // 通过:改名字
// let {name, age1 = 0, age: age2} = {name: 'zf', age: 10}
// console.log(name, age1, age2)

// let {b, ...obj} = {a: 1, b: 2, c: 3}
// console.log(obj)

// 数据结构 集合 hash表
// Set 和 Map
let arr1 = [1, 1, 1, 2, 6]
let arr2 = [1, 2, 3, 4]

function intersection(a, b) {
  let s1 = new Set(a)
  let s2 = new Set(b)
  // console.log(Array.from(s1), [...s1])
  // 类数组 有索引 有长度 数组能迭代
  return [...s1].filter(item => s2.has(item))
}
console.log(intersection(arr1, arr2))

// Array.from 不借助自身的迭代器的 ...能展开的内容必须要有迭代器
// console.log([...{ // 生成器可以产生迭代器
//   0: 1,
//   1: 2,
//   legnth: 2,
//   [Symbol.iterator]:function*() {
//     let idx = 0
//     while (idx !== this.length) {
//       yield this[idx++]
//     }
//   }
// }])

// 不能对象套对象 map的key 可以是任何值 不能放重复项
let map = new Map([['a', 1], ['a', 1], [{a: 1}, {b: 1}], [{a: 1}, {b: 1}]])
console.log(map)
// map.forEach ...

// WeakMap 不会导致内存泄漏
let a = {b:1}
let m = new WeakMap() // WeakMap WeaakSet 表示都是弱引用 (key只能是个对象)

