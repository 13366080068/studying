// var问题
// 1. 重复声明的问题
// 2. 变量提升的问题 var function import
// 3. var 默认会把变量声明到全局上 let 不会被声明到window 可以和{}代码块组合成一个作用域
// 4. 我们var 是没用作用域的概念的
// 5.我们声明的变量有些不需要更改的但是可以随意更改
// let a = 100
// {
//   console.log(a) // 暂存死区
//   let a = 1
// }
// console.log(a)

// var在for循环标记变量共享，一般在循环中使用的i会被共享，其本质上也是由于没有块级作用域造成的
for (let i = 0; i < 3; i++) { // 用var会打印 3 3 3 而不是 0 1 2
  setTimeout(() => {
    console.log(i)
  }, 0) // 在浏览器默认0 代表不少于4ms执行
}
const PI = 3.14
// 只要不变就全部用const 只要改变就用let
