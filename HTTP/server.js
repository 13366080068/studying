const http = require('http')
const url = require('url') // {pathname, query}
const fs = require('fs')
const path = require('path')
const mime = require('mime')
let server = http.createServer()

server.on('request', (req, res) => {
  // 路由的概念 根据不同的路径 返回不同的结果
  let { pathname } = url.parse(req.url)
  // 实现一个静态服务 http://localhost:8081/server.js
  let absFilePath = path.join(__dirname, pathname) // 不用resolve，因为resolve遇到/会返回根目录

  fs.stat(absFilePath, (err, statObj) => {
    if (err) { // 文件不存在
      res.statusCode = 404
      return res.end('Not Found')
    }
    // 直接访问的是一个文件，还有可能访问的是一个目录，如果是目录 我需要找到目录下index.html
    if (statObj.isDirectory()) { // localhost:8081/ index.html
      absFilePath = path.join(absFilePath, 'index.html')
      fs.access(absFilePath, err => {
        if (err) {
          res.statusCode = 404
          return res.end('Not Found')
        } else {
          res.setHeader('Content-Type', 'text/html;chartset=ytf8')
          fs.createReadStream(absFilePath).pipe(res)
        }
      })
    } else {
      // webpack getType  lookup
      res.setHeader('Content-Type', mime.getType(absFilePath)+';charset=utf8')
      fs.createReadStream(absFilePath).pipe(res)
      // fs.readFile(absFilePath, (err, data) => {
      //   res.end(data)
      // })
    }
  })
})

server.listen(8081, () => {
  console.log('server start 8081')
})
