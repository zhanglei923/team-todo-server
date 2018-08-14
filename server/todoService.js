const fs = require('fs');
const pathutil = require('path');
const moment = require('moment');

let MaxHistory = 100;
let defaultProjectName = 'default'
let currentProjectName;
let dataPath = pathutil.resolve(__dirname, '../../team-todo-data/')
console.log(dataPath)

let getSavePath = (prjName) =>{
    return dataPath + '/' + prjName + '/'
}

let handler = {
    getCountPath: (prjName)=>{
        return getSavePath(prjName) + '/counter.json'; 
    },
    getCount: (prjName)=>{
        let count = 0;
        let counterPath = handler.getCountPath(prjName)
        if(!fs.existsSync(counterPath)){
            fs.writeFileSync(counterPath, count);
        }
        count = fs.readFileSync(counterPath, 'utf8');
        return parseInt(count);
    },
    setCount: (prjName, count)=>{
        let counterPath = handler.getCountPath(prjName)
        fs.writeFileSync(counterPath, count);
    },
    getHistoryList:(prjName)=>{
        console.log('gg', prjName)
        var results = []
        if(!fs.existsSync(getSavePath(prjName))) return;
        var list = fs.readdirSync(getSavePath(prjName))
        list.forEach(function(file) {
            file = getSavePath(prjName) + '/' + file
            var stat = fs.statSync(file)
            if (stat && stat.isFile() && !/counter\.json$/.test(file)){
                //console.log(stat)
                //console.log(file)
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
    cleanHistory: (prjName)=>{
        var results = handler.getHistoryList(prjName);
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
    loadAllTodo:(prjName)=>{
        let history = handler.getHistoryList(prjName);
        if(history.length===0) return [];
        let latest = history[0]
        //let count = handler.getCount();
        let fpath = latest.file;
        if(!fs.existsSync(fpath)) return [];
        let todos = fs.readFileSync(fpath, 'utf8');
        return JSON.parse(todos);
    },
    saveAllTodo:(prjName, todos)=>{
        let count = handler.getCount(prjName);
        count++;
        let fpath = getSavePath(prjName) + '/' + handler.getFileName(count);
        fs.writeFileSync(fpath, JSON.stringify(todos)); 
        handler.setCount(prjName, count)
        //fs.readFileSync( 'utf8')
        handler.cleanHistory(prjName);
    },
    loadProjects:()=>{
        if(!fs.existsSync(dataPath)) return [];
        var list = fs.readdirSync(dataPath)
        let results = [];
        list.forEach(function(file) {
            var fpath = dataPath + '/' + file
            var stat = fs.statSync(fpath)
            if (stat && !stat.isFile()){
                results.push(file)
            }
        })
        console.log(results)
        return results;
    },
    createProject:(projectName)=>{
        let fpath = getSavePath(projectName);
        if(fs.existsSync(fpath)) return 'exist';
        fs.mkdirSync(fpath)
        return 'succ';
    }
};
module.exports = handler;
