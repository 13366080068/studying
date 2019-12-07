// let Promise = require('./promise')
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
    reject(1000)
  }, 1000)
})
Promise.reject(p).catch(err => {
  console.log(err)
})
