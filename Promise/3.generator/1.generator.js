// function * read() {
//   yield 1
//   yield 2
//   return 123
// }

// let it = read()

// let r = it.next()
// console.log(r)
// r = it.next()
// console.log(r)
// r = it.next()
// console.log(r)

// function * read() {
//   let a = yield 1
//   console.log(a)
//   let b = yield 2
//   console.log(b)
// }
// let it = read()
// it.next() // next方法第一次传递参数是无效的
// it.next('hello') // 之后的next方法传递的参数会变成yield的放回值
// it.next('world')
// let fs = require('fs').promises
// function * read() {
//   try {
//     let content = yield fs.readFile('content.txt', 'utf8')
//     let age = yield fs.readFile(content, 'utf8')
//     return age
//   } catch(e) {
//     console.log(e)
//   }
// }

// function co(it) {
//   return new Promise((resolve, reject) => {
//     function next(val) { // 异步迭代需要借助next函数
//       let { value, done } = it.next(val)
//       if (done) { // 如果迭代完成，就将结果作为这个promise的结果就可以了
//         resolve(value)
//       } else {
//         Promise.resolve(value).then(y => {
//           next(y) // 当地一个promise执行完毕后，继续迭代下一个promise
//         }, err => {
//           it.throw(err)
//           reject(err)
//         })
//       }
//     }
//     next()
//   })
// }

// co(read()).then(data => {
//   console.log(data)
// })

// let it = read()
// let { value } = it.next()
// value.then(data => {
//   let { value } = it.next(data)
//   value.then(data => {
//     let r = it.next(data)
//     console.log(r.value)
//   })
// })

// async + await 语法糖 generator + co
let fs = require('fs').promises
async function read() {
  try {
    let content = await fs.readFile('content.txt', 'utf8')
    let age = await fs.readFile(content, 'utf8')
    return age
  } catch(e) {
    console.log(e)
  }
}

read().then(data => {
  console.log(data)
})
