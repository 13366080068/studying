module.exports = () => {
  return async (ctx, next) => {
    ctx.request.body = await new Promise((resolve, reject) => {
      let arr = []
      ctx.req.on('data', function(chunk) {
        arr.push(chunk)
      })
      ctx.req.on('end', function() {
        ctx.body = Buffer.concat(arr).toString()
      })
    })
  }
}