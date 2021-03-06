// koa @koa/multer koa-bodyparser

const Koa = require('koa')
const Router = require('koa-router')
const util = require('util')
// const views = require('koa-views') // 模板的渲染
const app = new Koa()

function views(dirname,{extension}){
    return async (ctx,next)=>{
        ctx.render =async  function (filename,renderObj) {
            let ejs = require(extension) // 引入对应的模板
            let renderFile = util.promisify(ejs.renderFile)
            try{
                ctx.body = await renderFile(require('path').join(dirname,filename),renderObj)
            }catch{
               ctx.body = 'render fail'
            }
        }
        await next()
    }
}
const router = new Router()
app.use(views(__dirname + '/views', {extension: 'ejs'})) // render方法 渲染函数
// 管理系统 ssr ejs + 服务端数据渲染
app.use(router.routes())

router.get('/',async (ctx,next)=>{
    await ctx.render('page.ejs',{name:'zf'})
})

app.listen(3000)
