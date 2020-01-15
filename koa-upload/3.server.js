// koa-better-body  koa-convert generator => async + await
const Koa = require('koa')
const Router = require('@koa/router')
const multer = require('@koa/multer')
const static = require('koa-static')

const app = new Koa()
const router = new Router()
const upload = multer() // note you can pass `multer` options here
app.use(static(__dirname))
// add a route for uploading multiple files
router.post(
  '/upload',
  upload.fields([
    {
      name: 'avatar',
      maxCount: 2
    }
  ]),
  ctx => {
    console.log('ctx.request.files', ctx.request.files)
    console.log('ctx.files', ctx.files)
    console.log('ctx.request.body', ctx.request.body)

    ctx.body = 'done'
  }
)
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3000)
