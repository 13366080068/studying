// 1. finally es9 只能在高版本node使用
// Promise.prototype.finally = function (callback) {
//   // finally就是一个then方法
//   return this.then(data => {
//     // 调用Promise.resolve确保callback中的promise执行完成
//     return Promise.resolve(callback()).then(() => data)
//   }, err => {
//     return Promise.resolve(callback()).then(() => {throw err})
//   })
// }

// Promise.reject(100).finally(() => {
//   console.log('Success')
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve('123')
//     }, 5000)
//   })
// }).then(data => {
//   console.log('s:' + data)
// }).catch(err => {
//   console.log('f:' + err)
// })
// 面试必问

// 2. Promise.all 全部成功才成功
const fs = require('fs')
const isPromise = value => {
  return value && typeof value.then === 'function'
}
Promise.all = function (promises) {
  return new Promise((resolve, reject) => {
    let resultArr = []
    let idx = 0
    const processData = (data, index) => {
      resultArr[index] = data
      if (++idx === promises.length) {
        resolve(resultArr)
      }
    }
    for (let i = 0; i < promises.length; i++) {
      let currentValue = promises[i]
      if (isPromise(currentValue)) {
        currentValue.then(data => {
          processData(data, i)
        }, reject)
      } else {
        processData(currentValue, i)
      }
    }
  })
}

Promise.all([fs.readFile('./age.txt', 'utf8'), fs.readFile('./name.txt', 'utf8'), 2, 3, 4]).then(data => {
  console.log(data)
}, err => {
  console.log(err)
})

