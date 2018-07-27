const fs = require('fs');
const Koa = require('koa');
var Router = require('koa-router');

const actionsHandler = require('./server/actionsHandler')

var app = new Koa();
var router = new Router();

// app.use(async ctx => {
//   ctx.body = 'Hello World';
// });

 
router
   .get('/', (ctx, next) => {
        ctx.body = actionsHandler.loadPage();
    })
  .get('/action/query/todos', (ctx, next) => {
        ctx.body = 'Hello todos!';
  })
  .post('/action/save/todos', (ctx, next) => {
    let req = ctx.request;
    console.log(req)
    console.log(ctx.req)
    ctx.body = 'Hello save!';
  })
 
app
  .use(router.routes())
  .use(router.allowedMethods());



let port = 3005;
app.listen(port);
console.log(`http://localhost:${port}/`)