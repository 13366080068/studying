let Promise = require('./promise')

let promise = new Promise((resolve, reject) => {
  resolve(100)
})

// 穿透
promise.then().then().then(data => {
  console.log(data)
}, err => {
  console.log(err, 'err')
})
