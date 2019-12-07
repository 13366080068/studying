// promise 解决异步编程的方法
// 1) 多个异步方法串行问题 链式调用
// 2) 多个异步并发的问题 Promise.all

// promise 代表的是承诺 我答应你...
  // 结果有1.成功态 2.失败态 3.等待态
  // 只有等待态 才可以将状态变成 成功/失败
// es6规范中提供的一个类
  // 1.每个promise需要一个执行器函数(这个函数回立即执行)
  // 2.new Promise之后会产生一个promise实例，这个实例上存在一个then方法
  // 3.executor中需要提供一个成功和失败的方法
  let Promise = require('./promise')
let p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('有钱了')
  }, 1000);
})
p.then(data => {
  console.log(data)
}, err => {
  console.log(err)
})
console.log(2)
