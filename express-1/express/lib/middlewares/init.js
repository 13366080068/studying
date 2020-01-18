// 中间件
module.exports = function (app) {
  return function (req, res, next) {
    req.__proto__ = app.request
    res.__proto__ = app.response
    next()
  }
}
