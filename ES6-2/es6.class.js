class Animal { // Object.defineProperty
  // 静态方法 es6不支持静态属性
  static get a() { // 静态方法也是可以被继承的
    return 100
  }
  constructor(name) {
    this.name = name
  }
  eat() { // Animal.prototype.eat
    console.log('Eat Meat')
  }
  get a() { // Animal.prototype.a = 100
    return 100
  }
}

class Tiger extends Animal { // 会继承实例 + 公共属性
  constructor(props) { // 写了constructor继承必须要写super
    super(props) // super就是父类 Animal.call(this, name)
  }
  eat() { // Animal.prototype
    super.eat()
    console.log('吃菜')
  }
}
let tiger = new Tiger('White Tiger')
console.log(tiger.name)
console.log(tiger.eat())
console.log(Animal.a)
console.log(Tiger.a) // 原理 Tiger.__proto__ = Animal
console.log(tiger.a)
// 实例属性 公共属性 静态方法 属性访问器

// 装饰器 肯定会被废弃 es7语法

