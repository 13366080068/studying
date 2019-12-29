// 多语言 手动配置
// 1. 路径不同返回不同的页面
// 2. 前端多语言 通过设置不同的json
// 3. 后端国际化 ajax -> 我需要什么语言
// Accept-Language: zh-CN,zh;q=0.9
// Accept-Language: en;zh;q=0.9

const http = require('http')
const path = require('path')
const fs = require('fs')
const url = require('url')
const whiteList = ['b.zf.cn:3000']
const languages = {
  en: {
    message: 'hello world'
  },
  zh: {
    message: '你好, 世界'
  }
}

const server = http.createServer((req, res) => {
  let lans = req.headers['accept-language']
  // en,zh;q=0.9 = [{name:'en'},{name:'zh'}]
  let r = lans.split(',').map(lan => {
    let [name, q] = lan.split(';')
    let obj = {name}
    if (!q) {
      q = 'q=1'
    }
    obj.q = q.split('=')[1]
    return obj
  }).sort((a, b) => b.q - a.q) // 按照权重来排序
  for (let i = 0; i < r.length; i++) {
    let lan = languages[r[i].name]
    if (lan && lan.message) {
      return res.end(lan.message)
    }
  }
  return res.end('not has message')
  console.log(r)
})
server.listen(3000)
