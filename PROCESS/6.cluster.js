// 内部原理就是多进程
// 分布式 前端和后端 集群 多个功能相同的来分担工作

// 集群 可以实现多个cpu的负载均衡 一般情况

const { fork } = require('child_process')
const cpus = require('os').cpus().length
const path = require('path')

const http = require('http')

http.createServer(function () {
  res.end(process.pid + ' ' + ' main end')
}).listen(3000)

for (let i = 0; i < cpus.length; i++) {
  let cp = fork('server.js', { cwd: path.resolve(), stdio: [0,1,2, 'pipe'] })
}

