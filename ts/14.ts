/*
type sumFunc = (a: number, b: number) => number
let sum: sumFunc
function f1(a: number, b: number): number {
  return a
}
sum = f1
// 可以省略一个参数
function f2(a: number): number {
  return a
}
sum = f2
// 可以省略2个参数
function f3(): number {
  return 1
}
sum = f3
// 不能多传参数
function f4(a: number, b: number, c: number): number {
  return 1
}
// sum = f4

// 这个不是箭头函数
type getPerson = () => { name: string, age: number }
function g1() {
  return { name: 'zhufeng', age: 10 }
}
let g: getPerson = g1
// 返回值属性可以多，但是不可以少
function g2() {
  return { name: 'zhufeng', age: 10, home: '1' }
}
let gx: getPerson = g2
gx().name
*/

// 函数参数的双向协变
// 当比较函数参数的类型的时候，只有当源函数参数能够 赋值给目标函数或者返回来才能赋值成功
// let 是定义变量，或者说定义值 type是定义类型
// let 值是可以放在等号右边给变量赋值的，而type是不能放在等号右边给变量赋值的
let sourceFunc = (args: number | string) => { } // 定义一个箭头函数
type source2Func = (args: number | string) => void // 类型,肯定没有函数体
interface something {
  (a: string): void,
  a: () => void
}
let target1Func = (args: number) => { }
let target2Func = (aargs: number | string | boolean) => { }
sourceFunc = target1Func
sourceFunc = target2Func
let v1:number | string = 'd'
let v2:number
let v3:number | string | boolean
// v3 = v1
v1 = v2

type a1 = {}
type b1 = {}
type ax = b1

// let arr = () => ({ name: 'zhufeng' })
enum EventType {
  MouseEvent
}
interface Event {
  time: number;
}
interface MouseEvent extends Event {
  pageX: number;
  pageY: number;
}
function addEventListener(eventType: EventType, handler: (event: Event) => void) {

}
addEventListener(EventType.MouseEvent, (event: MouseEvent) => {

})
