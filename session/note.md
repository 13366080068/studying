- 什么是session 可以存放敏感信息,ssr  redis数据库中
- koa-router
- koa-views
- koa-generator
- jwt

> cookie + sign

JSON Web Token（JWT）是目前最流行的跨域身份验证解决方案

解决问题：session不支持分布式架构，无法支持横向扩展，只能通过数据库来保存会话数据实现共享。如果持久层失败会出现认证失败。

优点：服务器不保存任何会话数据，即服务器变为无状态，使其更容易扩展。

// vue react => token
## JWT包含了使用.分隔的三部分
- header
```
{ "typ": "JWT", "alg": "HS256" } base64编码
```

