const PENDING = 'PENDING'
const RESOLVED = 'RESOLVED'
const REJECTED = 'REJECTED'

class Promise {
  constructor(executor) {
    this.status = PENDING
    this.value = undefined // 成功的原因
    this.reason = undefined // 失败的原因
    let resolve = value => { // 成功的函数
      if (this.status === PENDING) {
        this.status = RESOLVED
        this.value = value
      }
    }
    let reject = reason => { // 失败的函数
      if (this.status === PENDING) {
        this.status = REJECTED // 改变状态
        this.reason = reason // 和原因
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
  }
}

module.exports = Promise
