// 二级路由 路由拆分
const Koa = require('koa')
const Router = require('koa-router')
let app = new Koa()
let user = new Router()
let article = new Router()

user.prefix('/user')
user.get('/add', (ctx, next) => {
  ctx.body = 'add'
})
user.get('/remove', (ctx, next) => {
  ctx.body = 'remove'
})
article.prefix('/article')
article.get('/add', (ctx, next) => {
  ctx.body = 'article add'
})
article.get('/remove', (ctx, next) => {
  ctx.body = 'article remove'
})
app.use(user.routes())
app.use(article.routes())
app.listen(3000)
