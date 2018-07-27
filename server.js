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
   .get('/team-todo', (ctx, next) => {
        ctx.body = actionsHandler.loadPage();
    })
  .get('/action/query/todos', (ctx, next) => {
    ctx.body = 'Hello todos!';
  })
  .post('/action/save/todos', (ctx, next) => {
    ctx.body = 'Hello save!';
  })
 
app
  .use(router.routes())
  .use(router.allowedMethods());



let port = 3005;
app.listen(port);
console.log(`http://localhost:${port}/`)