const PENDING = 'PENDING'
const RESOLVED = 'RESOLVED'
const REJECTED = 'REJECTED'

const resolvePromise = (promise, x, resolve, reject) => {
  if (promise === x) { // 说明死循环了，直接拒绝即可
    return reject(new TypeError('Chaining cycle detected for promise'))
  }
  // 接下来 判断x的类型 是promise还是普通值
  // 如果x 不是对象也不是函数 string null undefined
  let called
  if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
    // 如何判断一个对象是不是promise promise必须要有then方法
    try { // 有可能这个then方法在别人的promise中是通过defineProperty定义的，取值的时候可能会发生异常，那就让这个promise2变成失败即可
      let then = x.then // 获取then方法
      if (typeof then === 'function') { // 如果它有then函数说明它是一个promise
        then.call(x, (y) => { // 解析y保证它是一个普通值
          if (called) return
          called = true
          resolvePromise(promise, y, resolve, reject)
        }, r => {
          if (called) return
          called = true
          reject(r)
        })
      } else {
        resolve(x)
      }
    } catch(e) {
      if (called) return
      called = true
      reject(e)
    }
  } else { // x就是一个普通值
    resolve(x)
  }
}

class Promise {
  constructor(executor) {
    this.status = PENDING
    this.value = undefined
    this.reason = undefined
    this.onResolvedCallbacks = []
    this.onRejectedCallbacks = []
    let resolve = value => { // value 有可能是一个promise
      if (value instanceof Promise) { // 只能判断它是自己的promise
        return value.then(resolve, reject) // 递归
      }
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
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : val => val
    onRejected = typeof onRejected === 'function' ? onRejected : err => {throw err}
    // 递归每次调用then的时候，都返回一个新的promise
    let promise2 = new Promise((resolve, reject) => {
      if (this.status === RESOLVED) {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value)
            resolvePromise(promise2, x, resolve, reject)
            // 只需要拿到then的返回结果 直接将这个值传递给promise2即可
          } catch(e) {
            reject(e)
          }
        }, 0)
      }
      if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason)
            resolvePromise(promise2, x, resolve, reject)
          } catch(e) {
            reject(e)
          }
        }, 0)
      }
      if (this.status === PENDING) {
        this.onResolvedCallbacks.push(() => {
          // todo...
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value) // AOP
              resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          }, 0)
        })
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason)
              resolvePromise(promise2, x, resolve, reject)
            } catch(e) {
              reject(e)
            }
          }, 0)
        })
      }
    })
    return promise2
  }

  catch(errCallback) { // 没有传入成功的then方法就是catch
    return this.then(null, errCallback)
  }
}
// promises-aplus-tests 有一个入口   promises-aplus-tests  + 文件名
Promise.defer = Promise.deferred = function () {
  let dfd = {}
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve
    dfd.reject = reject
  })
  return dfd
}

Promise.reject = function (reason) { // 直接将原因向下抛出 没有等待的效果
  return new Promise((resolve, reject) => {
    reject(reason)
  })
}

Promise.resolve = function (value) { // 如果里面传入的值是一个promise 那么会等待这个promise执行完成
  return new Promise((resolve, reject) => {
    resolve(value)
  })
}

module.exports = Promise
