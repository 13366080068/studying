// env process 中的属性 我在执行命令的时候 如何传递参数
// windows 可以通过set命令来设置
// mac 可以通过export 来设置  cross-env
console.log(process.env); // 可以设置全局环境

// 实现了一个模块化 commonjs规范 产生一个函数将代码放到函数中 保证每个文件功能独立互不影响
