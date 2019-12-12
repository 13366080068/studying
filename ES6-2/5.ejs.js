let fs = require('fs')

let template = fs.readFileSync('./index.html', 'utf8')

function render(template, renderObj) {
  let head = "let str = '' \r\n with(obj){ \r\n str =`"
  template = template.replace(/<%=(.+?)%>/g, function() {
    return '${' + arguments[1] + '}'
  })
  let content = template.replace(/<%(.+?)%>/, function() {
    return arguments[1]
  })
  let tail = '`}\r\n return str'
  return new Function('obj', head + content + tail)(renderObj)
}

let r = render(template, {arr: [1,2,3]})
console.log(r)

// reduce方法
// call bind apply原理
// 函数柯里化
// arrow fn
// 浏览器的事件环
// node 核心 核心应用 node中的模块 自己实现一个commonjs规范
