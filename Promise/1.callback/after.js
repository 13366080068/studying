// lodash after方法

function eat() {
  console.log('Eat')
}

function after(callback, times) {
  return function () {
    if (--times === 0) {
      callback()
    }
  }
}

let fn = after(eat, 2)
fn()
fn()
// 扩展
