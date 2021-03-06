const moment = require('moment');
let isLinux = /^\/home/.test(__dirname)
let handler = {
    loadPage:()=>{
        let bundleUrl = isLinux ? "http://10.10.0.115/public/team-todo" : "http://127.0.0.1:3000/static/js"
        let html = `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
                <meta name="theme-color" content="#000000">
                <title>Team Todo!(Remote)</title>
            </head>
            <body>
                <div id="root"></div>
                <script type="text/javascript" src="${bundleUrl}/bundle.js?${Math.random()}"></script></body>
                <script type="text/javascript" src="${bundleUrl}/0.chunk.js"></script></body>
                <script type="text/javascript" src="${bundleUrl}/main.chunk.js"></script></body>
    
                </html>
        `
        return html;
    }
};
module.exports = handler;
