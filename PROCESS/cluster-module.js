const cluster = require('cluster')
const cpus = require('os').cpus()
const http = require('http')
// 入口文件

cluster.setupMaster()
if (cluster.isMaster) {
  for (let i = 0; i < cpus.length; i++) {
    cluster.fork() // child_process fork 会以当前文件创建子进程
    // 并且isMaster 为false 此时就会执行else方法
  }
} else {
  http.createServer((req, res) => {
    // 在集群的环境下可以监听同一个端口号
    res.end(process.pid + ':' + 'end')
  }).listen(3000)
}
