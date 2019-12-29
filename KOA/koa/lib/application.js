const EventEmitter = require('events')
const http = require('http')
const request = require('./request')
const Stream = require('stream')
const response = require('./response')
const context = require('./context')

module.exports = class Application extends EventEmitter {
  constructor() {
    super()
    this.middlewares = []
    this.request = Object.create(request)
    this.response = Object.create(response)
    this.context = Object.create(context)
  }
  use(middleware) {
    this.middlewares.push(middleware)
  }
  createContext(req,res) {
    let request = Object.create(this.request)
    let response = Object.create(this.response)
    let context = Object.create(this.context)
    context.request = request
    context.response = response
    context.res = response.res = res
    context.req = request.req = req
    return context
  }

  compose(ctx) {
    let index = -1
    function dispatch(index) {
      if (index === this.middleware.length) {
        return Promise.resolve()
      }
      let middleware = this.middlewares[index]
      return Promise.resolve(middleware(ctx, () => dispatch(index + 1)))
    }
    return dispatch(index)
  }

  handleRequest(req, res) {
    let ctx = this.createContext(req, res)
    this.middleware(ctx)

    let body = ctx.body
    if (typeof body === 'string' || Buffer.isBuffer(body)) {
      res.end(body)
    } else if (body) {}
  }
  listen() {
    let server = http.createServer(this.handleRequest.bind(this))
    server.listen(...arguments)
  }
}
