const fs = require('fs');
const pathutil = require('path');
const moment = require('moment');

let MaxHistory = 300;
let prjName = 'default'
let savePath = pathutil.resolve(__dirname, '../../team-todo-data/')
let counterPath = savePath + '/counter.json'; 
console.log(savePath)

let getSavePath = () =>{
    return savePath + '/' + prjName + '/'
}

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
    getHistoryList:()=>{
        var results = []
        if(!fs.existsSync(getSavePath())) return;
        var list = fs.readdirSync(getSavePath())
        list.forEach(function(file) {
            file = getSavePath() + '/' + file
            var stat = fs.statSync(file)
            if (stat && stat.isFile()){
                //console.log(stat)
                results.push({
                    birthtimeMs: stat.birthtimeMs,
                    file
                })
            }
        })
        results = results.sort((a,b)=>{
            return a.birthtimeMs - b.birthtimeMs;
        })
        results.reverse();
        return results;
    },
    cleanHistory: ()=>{
        var results = handler.getHistoryList();
        var count = 0;
        results.forEach((todo)=>{
            count++;
            if(!/counter\.json$/.test(todo.file))
            if(count > MaxHistory)fs.unlinkSync(todo.file)
        })
        console.log(results)
    },
    getFileName:(count)=>{
        let count0x = count.toString(32);//32进制
        let filename = `todos-${count0x}.json`; 
        return filename;
    },
    loadAllTodo:()=>{
        let history = handler.getHistoryList();
        if(history.length===0) return [];
        let latest = history[0]
        //let count = handler.getCount();
        let fpath = latest.file;
        if(!fs.existsSync(fpath)) return [];
        let todos = fs.readFileSync(fpath, 'utf8');
        return JSON.parse(todos);
    },
    saveAllTodo:(todos)=>{
        let count = handler.getCount();
        count++;
        let fpath = getSavePath() + '/' + handler.getFileName(count);
        fs.writeFileSync(fpath, JSON.stringify(todos)); 
        handler.setCount(count)
        //fs.readFileSync( 'utf8')
        handler.cleanHistory();
    }
};
module.exports = handler;
