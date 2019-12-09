let Promise = require('./promise')
// let fs = require('fs')

// function read(...args) {
//   let dfd = Promise.defer()
//   return new Promise((resolve, reject) => {

//   })
// }

// let p = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(new Promise((resolve, reject) => {
//       setTimeout(() => {
//         resolve('ok')
//       }, 1000)
//     }))
//   }, 1000)
// })

// p.then(data => {
//   console.log(data)
// })

let p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(5000)
  }, 5000)
})
Promise.reject(p).then(data => {
  console.log(data)
}).catch(err => {
  console.log(err)
})
Promise.reject(p).then(data => { // reject不会等待p的promise，直接抛错到.catch
  console.log(data)
}).catch(err => {
  console.log(err)
})
