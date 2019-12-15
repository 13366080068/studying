// argv 进程的参数列表 env 执行的环境变量  cwd() current working directory 指代的是在哪里运行的
// const path = require('path')
// console.log(process.cwd(), path.resolve())
// argv
// env
// cwd()

Promise.resolve().then(data => {
  console.log('then')
})
process.nextTick(() => { // Vue.nextTick 让当前的方法变成一个异步方法（异步的微任务）
  console.log('nextTick')
}) // node中自带微任务

// // node的事件环在11版本后执行方式和浏览器一致
const fs = require('fs')
const path = require('path')
fs.readFile(path.resolve(__dirname, 'a.js'), 'utf8', function(params) {
  setTimeout(() => {
    console.log('timeout')
  }, 0)
  setImmediate(() => {
    console.log('immediate')
  })
})
setTimeout(() => {
  console.log('outer timeout')
}, 0)
setImmediate(() => { // 这个方法开发的时候用的不多
  console.log('outer immediate')
})

// 默认先执行当前script脚本 执行完毕后 清空所有微任务，拿到timer中的队列，取出第一个执行，执行完毕后在清空所有微任务 ，在取出第二个timer.如果没有timer 会进入到 poll 阶段，如果有check 会向下执行，如果没有，就执行对应的i/o的回调，如果没有其他，会在这个阶段进行等待,等待定时器到达时间 返回
