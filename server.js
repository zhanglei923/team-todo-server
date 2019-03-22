const fs = require('fs');
const Koa = require('koa');
const pathutil = require('path');
var Router = require('koa-router');
var bodyParser = require('koa-bodyparser');
const session = require('koa-session');
const mkdir = require('make-dir')

const dataService = require('./server/dataService')
const pageActions = require('./server/pageActions')

var app = new Koa();
var router = new Router();

app.keys = ['some secret hurr'];
 
const CONFIG = {
  key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 86400000,
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
  rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
  renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
};
app.use(session(CONFIG, app));

// app.use(async ctx => {
//   ctx.body = 'Hello World';
// });
let dataRootPath = dataService.getDataPath();

 
router
   .get('/', (ctx, next) => {
        //console.log(ctx.session.views)
        ctx.session.views=999
        ctx.body = pageActions.loadPage();
    })
    .get('/action/projects', (ctx, next) => {
      let query = ctx.query;
      let reponsitoryName = query.reponsitoryName;
      let projects = dataService.loadProjects(reponsitoryName);
      ctx.body=projects;
    })
    .post('/action/create/project', (ctx, next) => {
      let req = ctx.request;
      let data = req.body;
      let reponsitoryName = data.reponsitoryName;
      let projectName = data.projectName;
      let succ = dataService.createProject(reponsitoryName, projectName)
      ctx.body=succ;
    })
  .get('/action/todos', (ctx, next) => {
    let query = ctx.query;
    //console.log(query)
    let reponsitoryName = query.reponsitoryName;
    let projectName = query.projectName;
      let todos = dataService.loadAllTodo(reponsitoryName, projectName);
      //console.log(todos)
      ctx.body = JSON.stringify(todos)
  })
  .post('/action/save/todos', (ctx, next) => {
    let req = ctx.request;
    let data = req.body;
    let tasks = data.tasks;
    let reponsitoryName = data.reponsitoryName;
    let projectName = data.projectName;
    //console.log('save:',projectName)
    if(!projectName) projectName = 'default';
    //ctx.body = 'Hello save!'+data.length;
    dataService.saveAllTodo(reponsitoryName, projectName, tasks)
    ctx.body = 'success'
  })
 
app
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());



let port = 3005;
app.listen(port);
console.log(`http://localhost:${port}/`)