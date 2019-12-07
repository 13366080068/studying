const PENDING = 'PENDING'
const RESOLVED = 'RESOLVED'
const REJECTED = 'REJECTED'

class Promise {
  constructor(executor) {
    this.status = PENDING
    this.value = undefined
    this.reason = undefined
    this.onResolvedCallbacks = []
    this.onRejectedCallbacks = []
    let resolve = value => { // 成功的函数
      if (this.status === 'PENDING') {
        this.status = RESOLVED
        this.value = value
        this.onRejectedCallbacks.forEach(fn => fn())
      }
    }
    let reject = reason => { // 失败的函数
      if (this.status === 'PENDING') {
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
