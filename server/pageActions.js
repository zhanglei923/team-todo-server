const moment = require('moment');
let handler = {
    loadPage:()=>{
        let html = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
                <meta name="theme-color" content="#000000">
                <title>Team Todo</title>
            </head>
            <body>
                <div id="root"></div>
                <script type="text/javascript" src="http://127.0.0.1:3000/static/js/bundle.js"></script></body>
            </html>
        `
        return html;
    }
};
module.exports = handler;
