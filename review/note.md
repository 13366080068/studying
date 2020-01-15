## 一.简答题
### 1.js垃圾回收机制
- js是自动内存管理，内存限制64位约1.4g 32位约0.7g ,
- 指代的是新生代和老生代的总大小,64位系统新生代大小为32M,老生代为1400M
- 新生代主要使用Scavenge进行管理,新生代分为from和to两个空间,开始回收的时候会检查from中的存活对象,如果存活拷贝到To中，之后互换。
- 老生代主要采用Mark-Sweep(标记清除，可能会导致内存碎片的问题)和Mark-Compact(标记整理，将活着的对象移动到左侧，速度慢)

### 2.函数节流和函数防抖 (lodash)

都为解决高频事件而来， scroll mousewhell mousemover touchmove onresize
- 防抖
```javascript
function debounce(fn,delay) {
    let timer = null;
    return function () {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this,...arguments);
        }, delay);
    }
}
body.onscroll = debounce(function () {
    console.log('scroll')
},1000);
```
- 节流
```javascript
function throttle(fn,delay) {
    let lastTime = 0;
    return function () {
        let nowTime = Date.now();
        if(nowTime - lastTime > delay){
            fn.call(this,...arguments);
            lastTime = nowTime
        }
    }
}
body.onscroll = throttle(function () {
    console.log('scroll')
},1000);
```

### 3.new new
```javascript
function A() {
  return function() {
    this.a = 'a'
    this.b = 'b'
  }
}
let instance = new new A()
```

### 4.Promise.resolve
```javascript
const p =Promise.resolve()
(()=>{
    const implicit_promise = new Promise(resolve =>{
        const promise = new Promise(res=>res(p))
        promise.then(()=>{
            console.log('after:await')
            resolve()
        })
    })
    return implicit_promise
})()
p.then(()=>{
    console.log('tick:a')
}).then(()=>{
    console.log('tick:b')
}).then(()=>{
    console.log('tick:c')
})
```

### 5.async + await问题
```javascript
setTimeout(function () {
    console.log('setTimeout')
}, 0)
async function asyncFunc1 () {
    console.log('asyncFunc1 start')
    await asyncFunc2()
    console.log('asyncFunc1 end')
}
async function asyncFunc2 () {
    console.log('asyncFunc2')
}
console.log('script start')
asyncFunc1()
new Promise(function (resolve) {
    console.log('promise1')
    resolve()
}).then(function () {
    console.log('promise2')
})
console.log('script end')
```
