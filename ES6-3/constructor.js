// js中的数据结构 队列 栈 hash表 key=>value 图 树 链表

// 队列 先进先出 数组 .push .shift

// 栈 .push .pop js函数的执行 典型的栈结构
// js叫 静态作用域
function a() { // 销毁的属性
  function b() {
    function c() {
      debugger
    }
    c()
  }
  b()
}
a()

// map es6 可以有一个key 查找快
// set 可以放不重复的项
// 图 邻接表 来表示

// 树 二叉树
// 链表 比队列 栈更方便
class Node {
  constructor(element) {
    this.element = element
    this.next = null
  }
}

class LinkList {
  constructor(element) {
    this.head = null
    this.length = 0
  }
  append(element) {
    let node = new Node(element)
    if (!this.head) {
      this.head = node
    } else {
      let current = this.head
      while (current.next) {
        current = current.next
      }
      current.next = node
    }
    this.length++
  }
  removeAt(idx) {
    let i = 0
    let current = this.head // 从头开始找
    let prev = null
    if (idx === 0) {
      this.head = this.head.next
    } else {
      while(i++ < idx) {
        prev = current
        current = current.next
      }
      prev.next = current.next
    }
    this.length--
  }
  insertAt(idx, element) {
    let node = new Node(element)
    if (idx === 0) {
      let oldHead = this.head
      this.head = node
      this.head.next = oldHead
    } else {
      let i = 0
      let current = this.head
      let prev = null
      while (i++ < idx) {
        prev = current
        current = current.next
      }
      prev.next = node
      node.next = current
    }
  }
}

let ll = new LinkList()
ll.append(3)
ll.append(4)
ll.append(5)
// ll.removeAt(1)
ll.insertAt(1, 100)
console.dir(ll, { dep: 100 })
