const EventEmitter = require('events')
const fs = require('fs')
class Node {
  constructor(element) {
    this.element = element
    this.next = null
  }
}
class LinkList {
  constructor() {
    this.length = 0
    this.head = null
  }
  append(element) {
    let node = new Node(element)
    if (!this.head) {
      this.head = node
    } else {
      let current = this.head
      while (current.next) current = current.next
      current.next = node
    }
    this.length++
  }
  shift() {
    let oldHead = this.head // 先拿出老的返回
    this.head = oldHead.next
    this.length--
    if (oldHead){}
  }
}
let ll = new LinkList()
ll.append(1)
ll.append(2)
ll.append(3)
console.log(ll)

class WriteStream extends EventEmitter {
  constructor(path, options={}) {
    super()
    this.path = path
    this.flags = options.flags || 'w'
    this.autoClose = options.autoClose || true
    this.start = options.start || 0
    this.encoding = options.encoding || 'utf8'
    this.highWaterMark = options.highWaterMark || 16*1024
    this.open()
    // 我每次写入需要有一个偏移量
    this.offset = this.start // 这个属性是可变的
    this.newDrain = false // 是否触发drain事件
    this.cache = new LinkList()
    this.len = 0 // 统计当前写入的总个数
  }
  destroy(err) { // 主要负责销毁当前可读
  }
  open(){}
  // 用户会同步调用write方法
  // 传入要写入的数据 编码 成功后的回调
  write(chunk, encoding = this.encoding, callback=()=>{}) {
    // chunk 可能是buffer 也可能是字符串
    chunk = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk) // chunk就是要写入的buffer
    this.len = chunk.length // 每次写入时增加，后续写入

    let flag = this.len < this.highWaterMark

    if (this.writing) {
      this.cache.append({ // 放到缓冲里 以后再用
        chunk,
        encoding,
        callback
      })
    } else {
      this.writing = true
      this._write(chunk, encoding, () => {
        callback()
        this.clearBuffer()
      })
    }
    return flag
  }
  clearBuffer() {
    // 去链表中取出第一个
    let obj = this.cache.shift()
    if (obj) { // 缓存里有

    } else { // 说明缓存区清空
      this.writing =
    }
  }
  _write(chunk, encoding, callback) {
    if (typeof this.fd !== 'number') {
      return this.once('open', () => this._write(chunk, encoding, callback))
    }
    fs.write(this.fd, chunk, 0, chunk.length, this.offset, (err, written) => {
      if (err) return this.destroy()
      this.offset += written
      this.len -= written
      callback()
    })
  }
}

module.exports = WriteStream
