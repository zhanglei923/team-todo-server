const fs = require('fs');
const Koa = require('koa');
const pathutil = require('path');
var Router = require('koa-router');
var bodyParser = require('koa-bodyparser');

const todoService = require('./server/todoService')
const pageActions = require('./server/pageActions')

var app = new Koa();
var router = new Router();

// app.use(async ctx => {
//   ctx.body = 'Hello World';
// });
let dataRootPath = pathutil.resolve(__dirname, '../team-todo-data/')
if(!fs.existsSync(dataRootPath)){
  fs.mkdirSync(dataRootPath)
  fs.mkdirSync(dataRootPath+'/default')
}
console.log(dataRootPath)

 
router
   .get('/', (ctx, next) => {
        ctx.body = pageActions.loadPage();
    })
  .get('/action/todos', (ctx, next) => {
    let query = ctx.query;
    console.log(query)
    let projectName = query.projectName;
      let todos = todoService.loadAllTodo(projectName);
      //console.log(todos)
      ctx.body = JSON.stringify(todos)
  })
  .post('/action/save/todos', (ctx, next) => {
    let req = ctx.request;
    let data = req.body;
    let tasks = data.tasks;
    let projectName = data.projectName;
    //console.log('save:',projectName)
    if(!projectName) projectName = 'default';
    //ctx.body = 'Hello save!'+data.length;
    todoService.saveAllTodo(projectName, tasks)
    ctx.body = 'success'
  })
 
app
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());



let port = 3005;
app.listen(port);
console.log(`http://localhost:${port}/`)