import http from 'http';
import fs from 'fs';
import router from './router/router.js';
import url from 'url';

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
    let handle = router[req.url];
    if (handle === undefined) {
      handle = router['/err'];
    }
    handle(req, res)
    
    //handle css
    const pathName = url.parse(req.url, true).pathname;
    const checkPath = pathName.match(/\.js|\.css|\.png|\.jpg|\.ttf|\.woff|\.woff2|\.eot/);
    if (checkPath) {
        const contentType = typeFile[checkPath[0].toString().split('.')[1]];
        res.writeHead(200, {'Content-Type': contentType});
        fs.createReadStream(process.cwd() + req.url).pipe(res);
    }
});

server.listen('8080', () => {
    console.log('Server started on http://localhost:8080');
});
