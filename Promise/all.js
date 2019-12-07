// 我们希望同时读取多个文件内容 将内容组成一个数组

let fs = require('fs') // filesystem

function after(callback, times) {
  let arr = []
  return function (data) {
    arr.push(data)
    if (--times === 0) {
      callback(arr)
    }
  }
}

function fn(arr) {
  console.log(arr)
}
let out = after(fn, 2)

fs.readFile('./before.js', 'utf8', (err, data) => {
  out(data)
})

fs.readFile('./after.js', 'utf8', (err, data) => {
  out(data)
})
