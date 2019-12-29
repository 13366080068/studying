const http = require('http')
const fs = require('fs')
const path = require('path')
let total = fs.statSync(path.resolve(__dirname, 'test.txt')).size
console.log(total)
http.createServer((req, res) => {
  let range = req.headers['range']
  if (range) {
    let [,start=0,end=total] = range.match(/(\d*)-(\d*)/)
    res.setHeader('Content-Range', `bytes ${start}-${end}/${total}`)
    fs.createReadStream(file, {
      start: Number(start),
      end: Number(end)
    }).pipe(res)
  } else {
    fs.createReadStream(file).pipe(res)
  }
}).listen(3000)
