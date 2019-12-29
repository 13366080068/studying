const Koa = require('./koa')
const sleep = time => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Sleep')
    }, time)
  })
}
const app = new Koa()

app.use(async function (ctx, next) {
  console.log(1)
  let start = Date.now()
  await next() // 只是执行函数
  let end = Date.now() - start
  console.log('time:' + end)
  console.log(2)
})

app.use(function (ctx, next) {
  console.log(3)
  await next()
  console.log(4)
})

app.use(async function (ctx, next) {
  console.log(5)
  await sleep(2000)
  next()
  console.log(6)
})

app.on('error', function(e) {
  console.log(e)
})

app.listen(3000)
