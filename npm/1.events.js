// node 核心异步非阻塞 监听，异步完成后去处理

// 发布订阅模式 先做好监听，异步成功后通知我

let EventEmitter = require('events') // on/emit/off /once/newListener
let util = require('util') // promisify inherits 判断类型

// $on $emit

function Girl() {

}
util.inherits(Girl, EventEmitter) // 实现继承公共属性

let girl = new Girl()
girl.on('newListener', function(type) { // 每次我调用on方法时 就会触发此函数
  process.nextTick(() => {
    girl.emit(type)
  })
})
girl.once('女生失恋', (who) => { // 1绑定时 触发了 newListener
  console.log('哭' + who)
})
let listener = who => {
  console.log('逛街' + who)
}
girl.once('女生失恋', listener)
// removeListenner
// girl.off('女生失恋', listener)
girl.emit('女生失恋', '因为xxx')
// 使用继承
