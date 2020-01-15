interface Animal {
  name: string;
  age: number;
}
interface Person {
  name: string;
  age: number;
  idcard: number;
}
function getName(animal: Animal): string {
  return animal.name
}
let person: Person = {
  name: 'zhufeng',
  age: 10,
  idcard: 0
}

let name = getName(person)

let num: string | number
let str: string

// num = str
// str = num
// 什么是鸭子检查
let num2: {
  toString(): string
}
let str2: string = 'zhufeng'
num2 = true
num2 = 2
// 自动装箱 new String('zhufeng')
// toString():string
let str22: string = str2.toString()

// num2 = str2
// str2 = num2
// 类的兼容性 ts 并不是类型系统，类型并不重要，属性才重要
namespace a {
  class Animal{
    name: string
  }
  class Bird extends Animal {
    // swing: number
  }
  let a: Animal
  let b: Bird
  // a = b
  // b = a
  a = { name: 'zhufeng' }
  b = { name: 'zhufeng' }
}

export { }
