// koa @koa/multer koa-bodyparser
const Koa = require('koa')
const app = new Koa()

app.use(async (ctx, next) => {
  ctx.body = 'hello'
  await next()
})

app.use(async ctx => {
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, 1000)
  })
  ctx.body = 'end'
})

app.listen(3000)
