setTimeout(function () {
  console.log('setTimeout')
}, 0)
async function asyncFunc1 () {
  console.log('asyncFunc1 start')
  await asyncFunc2()
  console.log('asyncFunc1 end')
}
async function asyncFunc2 () {
  console.log('asyncFunc2')
}
console.log('script start')
asyncFunc1()
new Promise(function (resolve) {
  console.log('promise1')
  resolve()
}).then(function () {
  console.log('promise2')
})
console.log('script end')
