// js 里最核心的技能回调函数

// 高阶函数 (函数当作参数传递给另一个函数) 一个函数返回另一个函数

// 检查数据类型 typeof object/array/null Object.prototype.toString.call()
// instanceof constructor

function isType(type) {
  return function (content) {
    return Object.prototype.toString.call(content) === `[object ${type}]`
  }
}

let util = {}
['String', 'Boolean', 'Undefined'].forEach(type => {
  util['is' + type] = isType(type)
})

// 柯里化
// let isString = isType('String')
// let isBoolean = isType('Boolean')
console.log(util.isString('hello'))
console.log(util.isString(123))
console.log(util.isBoolean(true))
console.log(util.isBoolean(123))

// homework curry化(写成一个通用格式)
let isString = currying(isType, 'String')
