const http = require('http')
const url = require('url') // {pathname, query}
const fs = require('fs').promises
const { createReadStream } = fs
const path = require('path')
const mime = require('mime')

// 我希望可以通过async + await 来处理请求

class Server {
  async handleRequest(req, res) { // 主要保证方法中的this 永远指向server
    let { pathname, query } = url.parse(req.url, true)
    let absPath = path.join(__dirname, pathname)
    // 建议放一个ip地址 尽量不要写*
    res.setHeader('Access-Control-Allow-Origin', '*')
    // options试探性请求 只有复杂请求的时候会先发送options要求
    res.setHeader('Access-Control-Allow-Header', 'token') // token这个字段
    res.setHeader('Access-Control-Allow-Methods', 'PUT,DELETE')
    // pathname 是一个ajax请求
    if (pathname === '/data') {
      res.setHeader('Content-Type', 'application/json')
      switch (req.method.toLowerCase()) {
        case 'get':
          // res.end(`${query.callback}({name:'zf'})`)
          res.end(`{"name":"zf"}`)
        case 'delete':
          res.end(`{"name":"zf"}`)
        case 'post':
          // req.on('data')
          res.end(`{"name":"zf"}`)
      }
      return
    }
    try {
      let statObj = await fs.stat(absPath)
      if (statObj.isDirectory()) {
        absPath = path.join(absPath, 'index.html')
        await fs.access(absPath)
      }
      // 基本数据类型 string number boolean null undefined symbol bigInt
      this.sendFile(req,res,absPath)
    } catch(e) {
      // 看一下这个pathname 是不是个接口
      this.sendError(req, res)
    }
  }
  sendFile(req, res, absPath, statObj) {
    // 多次访问服务器 会不停的读取文件返回，如果 连续访问我 可以做缓存
    // 1.强制缓存 像max-age
    // res.setHeader('Expires', new Date(Date.now() + 10000).toGNTString())
    // 设置缓存时间10s
    // res.setHeader('Cache-Control', 'max-age=10') // 状态码还是200
    res.setHeader('Cache-Control', 'no-cache') // 每次都向服务端发请求
    // res.setHeader('Cache-Control', 'no-store') // 不缓存

    let lastModified = statObj.ctime.toGMTString()
    let ifModifiedSince =
    res.setHeader('Content-Type', mime.getType(absPath)+';charset=utf8')
    createReadStream(absPath).pipe(res)
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