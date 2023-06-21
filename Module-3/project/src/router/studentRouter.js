import fs from "fs";
import qs from 'qs';
import url from 'url';
import { StudentServices } from '../service/studentServices.js';

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

let studentRouter = {
    '/student': (req, res) => {
        fs.readFile('view/student/student.html', 'utf-8', (err, html) => {
            let itemsHtml = '';
            for (const item of studentServices.findAll()) {
                itemsHtml += `<h2>${item.id}. ${item.name} - ${item.score}</h2>`
            }
            html = html.replace('{item}', itemsHtml);
            res.write(html);
            res.end();
        })
    },

    '/add': (req, res) => {
        fs.readFile('view/student/addStudent.html', 'utf-8', (err, html) => {
            res.write(html);
            res.end();
        })
    },

    '/edit': (req, res) => {
        fs.readFile('view/student/editStudent.html', 'utf-8', (err, html) => {
            res.write(html);
            res.end();
        })
    },

    '/search': (req, res) => {  
        const pathName = url.parse(req.url, true).pathname;
        const checkPath = pathName.match(/\.js|\.css|\.png|\.jpg|\.ttf|\.woff|\.woff2|\.eot/);
        if (checkPath) {
            const contentType = typeFile[checkPath[0].toString().split('.')[1]];
            res.writeHead(200, {'Content-Type': contentType});
            fs.createReadStream(process.cwd() + req.url).pipe(res);
        } 
        else {
            if (req.method === 'GET') {
                fs.readFile('view/student/findStudent.html', 'utf-8', (err, html) => {
                    res.write(html);
                    res.end();
                })
            }

            else {
                let data = '';
                req.on('data', (dataRaw) => {
                    data += dataRaw;
                });
                
                req.on('end', () => {
                    const parsedData = qs.parse(data);
                    const searchResults = studentServices.findStudentByName(parsedData.search);

                    if (searchResults.length === 0) {
                        console.log('Không tìm thấy sinh viên nào');
                        res.end('Khong tim thay sinh vien nao');
                    }
    
                    if (!parsedData.search) {
                        res.end('Loi!');
                    }

                    else {
                        fs.readFile('view/student/findStudent.html', 'utf-8', (err, html) => {
                            let itemsHtml = '';
                            for (const item of searchResults) {
                                itemsHtml += `<h2>${item.id}. ${item.name} - ${item.score}</h2>`
                            }
                            html = html.replace('opacity: 0;', 'opacity: 1;'); 
                            html = html.replace('{item}', itemsHtml);
                            res.write(html);
                            res.end();
                        });
                    } 
                });
            }
        }
    },

    '/delete': (req, res) => {
        if (req.method === 'GET') {
            fs.readFile('view/student/deleteStudent.html', 'utf-8', (err, html) => {
                res.write(html);
                res.end();
            })
        }

        else {
            let data = '';
            req.on('data', (dataRaw) => {
                data += dataRaw;
            });
            
            req.on('end', () => {
                const parsedData = qs.parse(data);

                if (parsedData.deleteId) {
                    studentServices.deleteStudent(parsedData.deleteId);
                    fs.readFile('view/student/student.html', 'utf-8', (err, html) => {
                        res.writeHead(302, {
                            'Location': '/student'
                          });
                        res.end();
                    });
                } 
    
                else {
                    res.end('Loi!');
                }
            });
        }
    },
}

export default studentRouter;
