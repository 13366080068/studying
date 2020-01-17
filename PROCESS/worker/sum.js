let total = 0
for (let i = 0; i < 100*10000; i++) {
  total += i
}
process.stdin.write('son' + process.pid + total + '---')