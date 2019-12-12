// es3 -> es6
// js中 封装的功能 类 方便扩展 封装 继承 多态

function Animal(name) {
  this.name = name
  // 判断当前这个animal 是如何调用的
  if (new.target === Animal) {
    throw new Error('这是一个抽象类 not new')
  }
}
Animal.prototype.eat = function() {
  console.log('Eat')
}

function Tiger(name) { // this
  Animal.call(this, name)
}
// Tiger.prototype = Animal.prototype 错误的这叫混合
// Object.setPrototypeOf(Tiger.prototype, Animal.prototype) // 同Tiger.prototype.__proto__ = Animal.prototype
function create(parentPrototype) {
  function Fn() {}
  Fn.prototype = parentPrototype
  let instance = new Fn()
  instance.constructor = Tiger
  return instance
}

Tiger.prototype = Objec.create(Animal.prototype, { constructor: { value: Tiger } })
let tiger = new Tiger('White Tiger')
console.log(tiger.name) // 继承了实例属性
console.log(tiger.eat()) // 公共方法
console.log(tiger.constructor)

// 继承实例属性 .call
// 继承公有属性 Child.prototype.__proto__ = Parent.prototype
// Object.create() es5方法

// let animal = new Animal('Tiger')
// let animal1 = new Animal('Tiger1')
// 1. 类中的属性 实例属性 公有属性
// 每个实例查找时 都会通过__proto__属性 查找到 所属类的原型
// console.log(Animal.prototype === animal.__proto__)
// console.log(animal.__proto__.constructor === Animal)
// console.log(Animal.__proto__ === Function.prototype)
// console.log(Animal.prototype.__proto__ === Object.prototype)
// console.log(Object.prototype.__proto__ === null) // 因为对象原型仍然是由对象构造出来的
// console.log(Function.prototype.__proto__ === Object.prototype) // 因为函数原型是由对象构造出来的
