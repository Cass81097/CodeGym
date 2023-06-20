import http from 'http';
import fs from 'fs';
import qs from 'qs';
import url from 'url';
import path from 'path';
// const port = process.argv[2] || 9000;
const typeFile = {
    'jpg': 'images/jpg',
    'png': 'images/png',
    'js': 'text/javascript',
    'css': 'text/css',
    'svg': 'image/svg+xml',
    'ttf': 'font/tff',
    'woff': 'font/woff',
    'woff2': 'font/woff',
    'eot': 'application/vnd.ms-fontobject'
}

const server = http.createServer((req, res) => {
    const pathName = url.parse(req.url, true).pathname;
    const checkPath = pathName.match(/\.js|\.css|\.png|\.jpg|\.ttf|\.woff|\.woff2|\.eot/);
    if (checkPath) {
        const contentType = typeFile[checkPath[0].toString().split('.')[1]];
        res.writeHead(200, {'Content-Type': contentType});
        fs.createReadStream(process.cwd() + req.url).pipe(res);
    } else {
        const arrPath = pathName.split('/');
        const trimPath = arrPath[arrPath.length - 1];
        let chosenHandle;
        console.log(router)
        if (typeof router[trimPath] === 'undefined') {
            chosenHandle = error.showNotFound;
        } else {
            chosenHandle = router[""];
        }
        chosenHandle(req, res);
    }

});

let handle = {};
handle.home = function (req, res) {
    fs.readFile('views/listStudent.html', 'utf-8', (err, stringHTML) => {
        res.write(stringHTML);
        res.end();
    })
}
let error = {};
let router = {
    '': handle.home,
}
error.showNotFound = (req, res) => {

}

server.listen(8080, () => {
    console.log('Server is running!');
})