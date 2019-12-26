// 缓存 后端设置前端缓存 和缓存的有效期

const http = require('http')
const url = require('url') // {pathname, query}
const fs = require('fs').promises
const { createReadStream } = require('fs')
const path = require('path')
const mime = require('mime')

class Server {
  async handleRequest(req, res) { // 主要保证方法中的this 永远指向server
    let { pathname } = url.parse(req.url, true)
    let absPath = path.join(__dirname, pathname) // 不用resolve，因为resolve遇到/会返回根目录
    try {
      let statObj = await fs.stat(absPath)
      if (statObj.isDirectory()) {
        absPath = path.join(absPath, 'index.html')
        await fs.access(absPath)
      }
      this.sendFile(req,res,absPath, statObj)
    } catch(e) { // 看一下这个pathname 是不是个接口
      this.sendError(req, res)
    }
  }
  sendFile(req, res, absPath, statObj) {
    // 多次访问服务器 会不停的读取文件返回, 如果 连续访问我 可以做缓存
    // 1.强制缓存 像max-age 多少秒内不要在访问我了  200, 只对当前文件引用的资源生效，不对首页生效
    // 10s内 访问相同的资源不要在访问我了
    // res.setHeader('Expires', new Date(Date.now() + 10000).toGMTString())
    // 设置缓存时间10s
    //res.setHeader('Cache-Control','max-age=10'); // 状态码还是200
    res.setHeader('Cache-Control', 'no-cache') // 每次都向服务端发起请求,缓存了但是禁用
    // res.setHeader('Cache-Control', 'no-store') // 不缓存

    // 设置对比缓存  最后的修改时间
    let lastModified = statObj.ctime.toGMTString() // 在Response Headers里,最后的修改时间
    console.log(req.headers)
    let ifModifiedSince = req.headers['if-modified-since'] // 在Request Headers里,上次的修改时间
    res.setHeader('Last-Modified', lastModified)
    if (ifModifiedSince === lastModified) { // 可能以秒为单位不够准确 ，最后修改时间变了 但是文件没变
      res.statusCode = 304
      res.end() // 走缓存
      return
    }

    res.setHeader('Content-Type', mime.getType(absPath)+ ';charset-utf8')
    createReadStream(absPath).pipe(res)
    // disk cache memory-cache
  }
  sendError(req, res) {
    res.statusCode = 404
    res.end('Not Found')
  }
  start() {
    // 1.解决this可以通过箭头函数的方式
    // bind可以绑定this指向 返回一个绑定后的函数，参数会传递给真正的函数
    const server = http.createServer(this.handleRequest.bind(this))
    server.listen(...arguments)
  }
}
let server = new Server()
server.start(3000, () => {
  console.log('server start 3000')
})
