import http from 'http';
import fs from 'fs'; 
import qs from 'qs';
import url from 'url';
import { StudentServices } from './services/studentServices.js';

let studentServices = new StudentServices();

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

    // file handle
    const pathName = url.parse(req.url, true).pathname;
    const checkPath = pathName.match(/\.js|\.css|\.png|\.jpg|\.ttf|\.woff|\.woff2|\.eot/);
    if (checkPath) {
        const contentType = typeFile[checkPath[0].toString().split('.')[1]];
        res.writeHead(200, {'Content-Type': contentType});
        fs.createReadStream(process.cwd() + req.url).pipe(res);
    } else {
        if (req.method === 'GET') {
            showList(req, res);
        } 
        
        else {
            let data = '';
            req.on('data', (dataRaw) => {
                data += dataRaw;
            });
            
            req.on('end', () => {
                const parsedData = qs.parse(data);
                if (parsedData.search) {
                    const searchResults = studentServices.findStudentByName(parsedData.search);
                    renderHtml(res, searchResults);
                } 
    
                else if (parsedData.deleteId) {
                    const deleteResults = studentServices.deleteStudent(parsedData.deleteId);
                    renderHtml(res, deleteResults);
                } 
    
                else if (parsedData.id && parsedData.name && parsedData.score) {
                    const newData = { id: parsedData.id, name: parsedData.name, score: parsedData.score };
                    studentServices.addStudent(newData);
                    showList(req, res);
                } 
    
                else {
                    res.end('Loi!');
                }
            });
        }
    }  
});

function showList(req, res) {
    const items = studentServices.findAll();
    renderHtml(res, items);
}

function renderHtml(res, items) {
    fs.readFile('./views/listStudent.html', 'utf-8', (err, html) => {
        let itemsHtml = '';
        for (const item of items) {
            itemsHtml += `<h2>${item.id}. ${item.name} - ${item.score}</h2>`
        }
        html = html.replace('{item}', itemsHtml);
        res.write(html);
        res.end();
    });
}

server.listen('8080', () =>{
    console.log('Kết nối thành công');
});
