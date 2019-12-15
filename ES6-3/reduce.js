// reduce 收敛函数 [1,2,3,4,5]

let r = [1,2,3,4,5].reduce(function (prevVal, curVal, curIdx, arr) {
  return prevVal + curVal
})
// console.log(r)
// 数组打平
let multiArr = [1, [2, [3, [4, [5]]]]]
console.log(multiArr.flat(2)) // [ 1, 2, 3, [ 4, [ 5 ] ] ], flat是es7方法
const flatten = (arr) => arr.reduce((res, item, idx, arr) => Array.isArray(item) ? res.concat(flatten(item)) : res.concat(item), [])
console.log(flatten(multiArr))

// compose redux 中间件 得多个函数 组合成一个函数
function sum(a, b, c) {
  return a + b + c
}
function addCurrency(value) {
  return '$' + value
}
function len(value) {
  return value.length
}

// const compose = (...fns) => (...values) => fns.reduceRight((prev, cur) => cur(prev), fns.pop()(...values))
// function compose(...fns) {
//   return fns.reduce(function(prev, next) {
//     return function(...values) { // compose(len, addCurrency, sum)
//       return prev(next(...values))
//     }
//   })
// }

let compose = (...fns) => fns.reduce((prev, cur) => (...values) => prev(cur(...values)))

let result = compose(len, addCurrency, sum)('a', 'b', 'c') // len(addCurrency(sum('a', 'b', 'c')))
console.log(result)

// 核心就是收敛

// 箭头函数的特点是？ 没有this 没有arguments 没有原型
var a = 1
let obj = {
  a: 100,
  fn: () => { // 该处箭头函数会把this指向window/global
    // this => obj
    setTimeout(() => {
      console.log(this.a)
    })
  }
}
obj.fn() // 1(浏览器下)/undefined(node下)
