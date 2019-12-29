const mappings = {
  'http://a.zf.cn': 'http://localhost:3000',
  'http://b.zf.cn': 'http://localhost:4000'
}
const http = require('http')
const httpProxy = require('http-proxy')

const proxy = httpProxy.createProxyServer()

http.createServer((req, res) => {
  let host = req.headers.host
  proxy.web(req, res, {
    target: mappings[host],
    selfHandleResponse: true
  })
  proxy.on('proxyRes', (proxyRes, req, res) => {
    var body = [] // 监听代理服务器返回的结果
    proxyRes.on('data', chunk => {
      body.push(chunk)
    })
    proxyRes.on('end', () => {
      body = Buffer.concat(body).toString()
      res.end('my response to cli' + body)
    })
  })
}, listen(80))

// 我访问了80 我希望代理到3000／4000 拿到响应的结果
// 代理 http-proxy

