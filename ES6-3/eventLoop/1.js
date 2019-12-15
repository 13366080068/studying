setTimeout(() => {
  console.log('timeout')
  Promise.resolve().then(data => {
    console.log('then1')
  }).then(data => {
    console.log('then4')
  })
  Promise.resolve().then(data => {
    console.log('then2')
  })
  Promise.resolve().then(data => {
    console.log('then3')
  })
}, 0)

Promise.resolve().then(data => {
  console.log('then')
  setTimeout(() => {
    console.log('timeout1')
  }, 0)
})
// then timeout then1 then2 then3 then4 timeout1
