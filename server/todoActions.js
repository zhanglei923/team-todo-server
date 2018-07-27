const fs = require('fs');
const pathutil = require('path');
const moment = require('moment');

let savePath = pathutil.resolve(__dirname, '../../team-todo-data/')
let counterPath = savePath + '/counter.json'; 
console.log(savePath)

let handler = {
    getCount: ()=>{
        let count = 0;
        if(!fs.existsSync(counterPath)){
            fs.writeFileSync(counterPath, count);
        }
        count = fs.readFileSync(counterPath, 'utf8');
        return parseInt(count);
    },
    setCount: (count)=>{
        fs.writeFileSync(counterPath, count);
    },
    getFileName:(count)=>{
        let count0x = count.toString(32);//32进制
        let filename = `todos-${count0x}.json`; 
        return filename;
    },
    loadAllTodo:()=>{
        let count = handler.getCount();
        let fpath = savePath + '/' + handler.getFileName(count);
        if(!fs.existsSync(fpath)) return [];
        let todos = fs.readFileSync(fpath, 'utf8');
        return JSON.parse(todos);
    },
    saveAllTodo:(todos)=>{
        let count = handler.getCount();
        count++;
        let fpath = savePath + '/' + handler.getFileName(count);
        fs.writeFileSync(fpath, JSON.stringify(todos)); 
        handler.setCount(count)
        //fs.readFileSync( 'utf8')
    }
};
module.exports = handler;
