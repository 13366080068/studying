

const Router = require('./router')
const Application = require('./application')
const static = require('serve-static')
// 分配职责 类的方式 来分开管理 高内聚 低耦合
// 1.createApplication 创建应用
// 2.路由系统
// 3.应用系统


function createApplication() { // 创建应用
  return new Application // 创建应用的实例
}
// express函数
createApplication.Router = Router
createApplication.static = static

module.exports = createApplication
