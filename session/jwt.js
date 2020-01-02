const Koa = require('koa')

const app = new Koa()
const jwt = require('jwt-simple')
const bodyparser = require('koa-bodyparser')
const Router = require('koa-router')
const secret = 'zfpx'
const router = new Router()

// 写登录 给用户派发一个token


router.post('/login', async (ctx, next) => {
  let { username, password } = ctx.request.body
  if (username === password) {
    let token = jwt.encode({ username }, secret)
    ctx.body = {
      data: { username },
      token
    }
  } else {
    ctx.body = {
      data: '登录异常',
      err: 1
    }
  }
})
app.use(router.routes())

app.listen(3000)
