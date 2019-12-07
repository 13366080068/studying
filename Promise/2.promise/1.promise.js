let fs = require('fs')
let { promisify } = require('util')

let read = promisify(fs.readFile)

// promise特性：then方法中传递的函数成功、失败这两个函数的返回值可以返回一个promise

// 1.返回的是promise 2.抛出错误 3.返回的是普通值
read('./name1.txt', 'utf8').then(data => {
  return read(data + '1', 'utf8')
}, err => {
  console.log('inner')
  throw new Error('error')
}).then(data => {
  console.log(data)
}).catch(err => {
  console.log(err)
}).then(data => {
  console.log(data)
})
// 链式调用的实现 是每一次都返回一个新的promise jquery返回this

// 先将代码包装成promise的
// let promisify = fn => { // fs.readFile
//   return (...args) => { // read
//     return new Promise((resolve, reject) => {
//       fn(...args, (err, data) => { // 只能格式化node的api方法
//         if (err) reject(err)
//         resolve(data)
//       })
//     })
//   }
// }

// function read(...args) {
//   return new Promise((resolve, reject) => {
//     fs.readFile(...args, (err, data) => {
//       if(err) reject(err)
//       resolve(data)
//     })
//   })
// }
