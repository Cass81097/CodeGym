import http from 'http';
import fs from 'fs';
import qs from 'qs';
import router from './router/router.js';

const server = http.createServer((req, res) => {
    let handle = router[req.url];
    if (handle === undefined) {
      handle = router['/err'];
    }
    handle(req, res)
});

server.listen('8080', () => {
    console.log('Server started on http://localhost:8080');
});
