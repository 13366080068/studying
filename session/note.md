- 什么是session 可以存放敏感信息, ssr redis数据库中
- koa-router
- koa-views
- koa-generator
- jwt

JSON Web Token(JWT)是日前最流行的跨域身份验证解决方案

// vue react => token
## JWT包含了使用、分隔的三部分
- header
```
{ "typ": "JWT", "alg": "HS256" }   base64编码
```
JWT规定了7个官方字段 用户自己的信息
iss(issuer): 签发人

- Authorization: Bearer <token>
