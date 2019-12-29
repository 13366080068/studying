const http = require('http')
const path = require('path')
const fs = require('fs')
const url = require('url')
const whiteList = []

const server = http.createServer((req, res) => {
  // 只针对图片类型进行单独防盗链处理
  const { pathname, query } = url.parse(req.url, true)
  const absPath = path.join(__dirname, pathname)
  fs.stat(absPath, (err, statObj) => {
    if (err) {
      res.statusCode = 404
      res.end('Not found')
      return
    }
    if (statObj.isFile()) {
      // 图片肯定
      if (/(\.png)|(\.jpg)/.test(absPath)) {
        let referer = req.headers['referer'] || req.headers['referer']
        if (referer) {
          let hostname = req.headers.host
          referer = url.parse(referer).host
          // if (hostname !== referer && !whiteList)
        }
      }
      fs.createReadStream(absPath).pipe(res)
    } else {
      res.statusCode = 404
      res.end('Not found')
      return
    }
  })
})
