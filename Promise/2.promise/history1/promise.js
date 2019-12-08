const PENDING = 'PENDING'
const RESOLVED = 'RESOLVED'
const REJECTED = 'REJECTED'

class Promise {
  constructor(executor) {
    this.status = PENDING
    this.value = undefined // 成功的原因
    this.reason = undefined // 失败的原因
    this.onResolvedCallbacks = [] // 存储成功的回调
    this.onRejectedCallbacks = []
    let resolve = value => { // 成功的函数
      if (this.status === PENDING) {
        this.status = RESOLVED
        this.value = value
        this.onResolvedCallbacks.forEach(fn => fn())
      }
    }
    let reject = reason => { // 失败的函数
      if (this.status === PENDING) {
        this.status = REJECTED
        this.reason = reason
        this.onRejectedCallbacks.forEach(fn => fn())
      }
    }
    try {
      executor(resolve, reject)
    } catch(e) {
      reject(e)
    }
  }
  then(onFulfilled, onRejected) {
    if (this.status === RESOLVED) {
      onFulfilled(this.value)
    }
    if (this.status === REJECTED) {
      onRejected(this.reason)
    }
    if (this.status === PENDING) {
      // 如果是等待状态我需要将 onFulfilled 和 onRejected 分别存放起来
      this.onResolvedCallbacks.push(() => {
        // todo...
        onFulfilled(this.value) // AOP
      })
      this.onRejectedCallbacks.push(() => {
        onRejected(this.reason)
      })
    }
  }
}

module.exports = Promise
