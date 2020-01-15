const mongoose = require('mongoose')

// conn 表示连接后的对象
const conn = mongoose.createConnection('mongodb://localhost:27017/school', {
  userNewUrlParser: true,
  userUnifiedTopology: true
})
// 商品为例
let ProductSchema = new mongoose.Schema({
  productName: String,
  productPrice: Number,
  createAt: {
    type: Date,
    default: Date.now // 默认值 东八区 少八个小时
  } // 多了不管 少了就少存
})

let Product = conn.model('Product', ProductSchema)

// 回调的方式
// Product.create({ productName: 'hello', productPrice: 10 }, function (err, dot) {
//   connsole.log(doc)
// })
(async () => {
  let r = await Product.create({ productPrice:100, age: 10 })
  console.log(r)
})

// 增删改查 限制数据的固定格式
// 数据库 限制集合中的数据格式 骨架

conn.on('open', function () {
  // 当前连接成功了
  console.log('Connect successfully')
})

conn.on('error', function (err) {
  console.log(err)
})
