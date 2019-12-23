let fs = require('fs')
let path = require('path')

let ws = fs.createWriteStream(path.resolve(__dirname, '2.txt'), {
  flags: 'w',
  autoClose: true,
  start: 1,
  encoding: 'utf8',
  highWaterMark: 2 // 期望的个数
})

// // 只能写入 string / buffer
// ws.write('hello') // fs.write
// ws.write('world') // fs.write => 会给异步任务进行排序
// ws.write('zf')

// // 异步并发 -> 异步串行

// ws.end('world') // 关闭文件 fs.close => write + close
// ws.end('world') // write after end 不能再end之后再调用write
let index = 0
function write() { // 写入的方法
  let flag = true
  while (index < 10 && flag) {
    flag = ws.write(index++ + '', 'utf8', () => {
      console.log('完毕' + index)
    })
  }
  if (index === 10) {
    ws.end() // 如果最终调用了end 这次drain也不会触发
  }
}
write()
ws.on('drain', function() {
  console.log('drain')
  write()
})
// for (let i = 0; i < 10; i++) {
//   ws.write(i + '')
// }
