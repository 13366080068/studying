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
  cache(req, res, absPath, statObj) {
    // 1.设置强制缓存 和对比缓存
    res.setHeader('Expires', new Date(Date.now() + 10000).toGMTString())
    res.setHeader('Cache-Control', 'max-age=10')

    let etag = statObj.size + ''
    let ctime = statObj.ctime.toGMTString()
    res.setHeader('Etag', etag)
    res.setHeader('last-Modified', ctime)

    let clientIfNoneMatch = req.headers['if-none-match']
    let clientIfModifiedSince = req.headers['if-modified-since']
    let flag = true
    if (clientIfNoneMatch !== etag) {
      flag = false
    }
    if (clientIfModifiedSince !== ctime) {
      flag = false
    }
    return flag
  }
  gzip(req, res, absPath, statObj) {
    // Accept-Encoding: gzip, deflate, br
    let encoding = req.headers['accept-encoding']
    let zlib = require('zlib')
    if (encoding.includes('gzip')) {
      res.setHeader('Content-Encoding', 'gzip')
      return zlib.createGzip()
    } else if (encoding.includes('deflate')) {
      res.setHeader('Content-Encoding', 'deflate')
      return zlib.createDeflate()
    }
    return false
  }
  async sendFile(req, res, absPath, statObj) {
    // 制作缓存 http 压缩
    // if (this.cache(req, res, absPath, statObj)) {
    //   res.statusCode = 304
    //   return res.end()
    // }
    res.setHeader('Content-Type', mime.getType(absPath)+ ';charset-utf8')
    // 如果没缓存 希望将文件压缩后返回
    let zip = this.gzip(req, res, absPath, statObj)
    if (zip) {
    return createReadStream(absPath).pipe(zip).pipe(res)
    }
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

// 304 last-modified if-modified-since
//     etag          if-none-match
// 打包 <!--make by 2019 12 26-->
