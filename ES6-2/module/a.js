
// export 语法默认不能导出一个具体的内容
// “接口” 我可以通过某个接口拿到这个属性

// export default 可以导出一个具体的值
let str1 = 'hello'
let str2 = 1
let str3 = 'hello2'

setInterval(() => {
  str2++
}, 1000)

export {
  str1,
  str2,
  str3 as default // 导出时 重命名 叫做default
}

// export default 'world'
