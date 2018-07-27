const fs = require('fs');
const Koa = require('koa');
var Router = require('koa-router');
var bodyParser = require('koa-bodyparser');

const todoActions = require('./server/todoActions')
const pageActions = require('./server/pageActions')

var app = new Koa();
var router = new Router();

// app.use(async ctx => {
//   ctx.body = 'Hello World';
// });

 
router
   .get('/', (ctx, next) => {
        ctx.body = pageActions.loadPage();
    })
  .get('/action/todos', (ctx, next) => {
      let todos = todoActions.loadAllTodo();
      //console.log(todos)
      ctx.body = JSON.stringify(todos)
  })
  .post('/action/save/todos', (ctx, next) => {
    let req = ctx.request;
    let data = req.body;
    //ctx.body = 'Hello save!'+data.length;
    todoActions.saveAllTodo(data)
    ctx.body = 'success'
  })
 
app
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());



let port = 3005;
app.listen(port);
console.log(`http://localhost:${port}/`)