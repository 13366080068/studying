let http = require('http')

http.get({
  host: 'a.zf.cn',
  pathname: 'images/1.jpg',
  port: 3000,
  headers: {
    'referer': 'http://a.zf.cn'
  }
}, res => { // res是服务端响应的结果
  let arr = []
  res.on('data', chunk => {
    console.log(chunk.toString())
    arr.push(chunk)
  })
  res.on('data', () => {
    let buffer = Buffer.concat(arr)
    fs.writeFile('2.jpg', buffer)
  })
})
