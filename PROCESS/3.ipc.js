const { spawn, fork } = require('child_process')
const path = require('path')

const cp = fork('sum.js', ['a', 'b'], {
  cwd: path.resolve(__dirname, 'worker'),
})

cp.send('hello 我是父亲')
cp.on('message', function (data) {
  console.log()
})

