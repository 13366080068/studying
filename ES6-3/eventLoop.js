// js运行机制 同步 异步
// js从上到下执行

// js 执行一个script脚本的时候 宏任务 样式渲染
// 1. 异步代码肯定会在同步代码之后执行 当前定时器
// setTimeout(() => {
//   console.log('ok')
// }, 1000)
// for (;true;) {}
// 以上代码ok永远不会被打印

// 2. 默认主线只有一条 执行js的时候只能同时执行一个（单线程）异步方法也是会创建一个线程的
// 进程 计算机分配任务和调度任务的基本单位
// 一个进程中可以放多个线程 js 的主线程只有一个
// 多进程模型

// 事件环
setTimeout(() => {
  console.log(1)
}, 0)
setTimeout(() => {
  console.log(2)
}, 0)
setTimeout(() => {
  console.log(3)
}, 0)
Promise.resolve().then(() => {
  console.log('then')
})
