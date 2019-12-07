// 我们希望同时读取多个文件内容 将内容组成一个数组

let fs = require('fs') // filesystem

let events = {
  dataSource: [],
  arr: [],
  on(callback) {
    this.arr.push(callback)
  },
  emit(data) {
    this.dataSource.push(data)
    this.arr.forEach(fn => fn(this.dataSource))
  }
}

events.on(function (result) { // 发布订阅可以实现解耦合
  if (result.length === 2) {
    console.log('订阅', result)
  }
})

fs.readFile('./before.js', 'utf8', (err, data) => {
  events.emit(data)
})

fs.readFile('./after.js', 'utf8', (err, data) => {
  events.emit(data)
})

// 发布订阅 发布 订阅
