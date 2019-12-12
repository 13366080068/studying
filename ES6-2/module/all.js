import * as obj1 from './a'
import * as obj2 from './b'

// export default { // 就不再是接口了 而是具体的值 所以不能用来导出变化的值，比如这里obj1中的str2
//   ...obj1,
//   ...obj2
// }

export { str1 } from './a' // 导出接口
export * from './b'

// 不能在这个文件中用str1
// import 才有声明的功能
console.log(str1)
