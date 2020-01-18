const express = require('express')

const app = express()

app.post('/', function (req, res, next) {
  console.log(1)
  next()
}, function (req, res, next) {
  console.log(11)
  next()
}, function (req, res, next) {
  console.log(111)
  next()
})
app.get('/', function (req, res, next) {
  res.end('haha')
})
app.post('/a', function (req, res, next) {
  res.end('ok111')
})
app.listen(3000)
