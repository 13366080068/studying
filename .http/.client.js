const http = require('http')
const fs = require('fs')

let flowing = true
process.stdin.on()

let ws = fs.createWriteStream('./download.txt')
let start = 0
function download() {
  let end = start + 5
  http.get({
    host: 'localhost',
    port: 3000,
    method: 'get',
    headers: {
      Range: `bytes=${start} - ${end}`
    }
  }, res => {
    res.headers['content-range'].split('/')[1]
    res.on('data', chunk => {
      ws.write(chunk)
      if (total > end) {
        start += 5
        setTimeout(() => {
          download()
        }, 1000)
      }
    })
  })
}
// client.end()
