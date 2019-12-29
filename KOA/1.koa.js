const Koa = require('./koa')
const app = new Koa()

app.use(function(ctx) {
  console.log(ctx.req.url)
  console.log(ctx.request.req.url)

  console.log(ctx.request.url)
  console.log(ctx.path, '---')

  ctx.body = undefined
  console.log(ctx.response.body)
})

app.listen(3000, function() {
  console.log('server start 3000')
})

app.on('error', function(err) {
  console.log(err, '-------------')
})
