const fs = require('fs');
const pathutil = require('path');
const moment = require('moment');

let savePath = pathutil.resolve(__dirname, '../../team-todo-data/')
let todoFilePath = savePath + '/todos.json'; 
console.log(savePath)

let handler = {
    loadAllTodo:()=>{
        let todos = fs.readFileSync(todoFilePath, 'utf8');
        return JSON.parse(todos);
    },
    saveAllTodo:(todos)=>{
        //fs.existsSync(savePath)
        fs.writeFileSync(todoFilePath, JSON.stringify(todos)); 
        //fs.readFileSync( 'utf8')
    }
};
module.exports = handler;
