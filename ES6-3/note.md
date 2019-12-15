- call、apply、bind原理
- 数组compose
- eventLoop 浏览器:https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/

## 宏任务微任务
- 微任务： promise.then ，MutationObserver，(process.nextTick Node)
- 宏任务：script ，ajax ， 事件，requestFrameAnimation， setTimeout ，setInterval ，setImmediate （ie下），MessageChannel ，(I/O) ，UI rendering。
