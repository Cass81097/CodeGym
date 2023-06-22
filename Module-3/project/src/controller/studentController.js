import { Console, log } from "console";
import { StudentServices } from "../service/studentServices.js";
import fs from 'fs'
import qs from 'qs'
import url from 'url'
let studentServices = new StudentServices()

class StudentController {

    showListStudent(req, res) {
        let data = ''
        req.on('data', (dataRaw) => {
            data += dataRaw;
        })
        req.on('end', () => {
            if (req.method === 'GET') {
                showList(req, res)
                
            } else {
                data  = qs.parse(data);               
                studentServices.save(data);
                showList(req, res);            
            }
        })
    }
    
    showFormAdd(req, res) {
        fs.readFile('view/student/addStudent.html', 'utf-8', (err, html) => {
            res.write(html);
            res.end();
        })   
    }

    showFormEdit(req, res) {
        fs.readFile('view/student/editStudent.html', 'utf-8', (err, html) => {
            const urlObject = url.parse(req.url, true);
            const proEdit = studentServices.findStudentById(urlObject.query.idEdit);
            // console.log(proEdit);
            html = html.replace('{id}', proEdit.id);
            html = html.replace('{name}', proEdit.name);
            html = html.replace('{score}', proEdit.score);
            res.write(html);
            res.end();
        }) 
    }

    delete(req, res) {
            const urlObject = url.parse(req.url, true);
            let test = studentServices.deleteStudent(urlObject.query.id);
            res.write("deleted");
            res.end();
    }

    search(req, res) {
        if (req.method === 'GET') {
            fs.readFile('view/student/searchStudent.html', 'utf-8', (err, html) => {
                res.write(html);
                res.end();
            });

        } else if (req.method === 'POST') {
            let data = '';
            req.on('data', (chunk) => {
                data += chunk;
            });
    
            req.on('end', () => {
                const parsedData = qs.parse(data);
                const searchResults = studentServices.findStudentByName(parsedData.search);
    
                if (!parsedData.search) {
                    res.end('Loi!');
                } else {
                    fs.readFile('view/student/searchStudent.html', 'utf-8', (err, html) => {
                        let itemsHtml = '';
                        for (const item of searchResults) {
                            itemsHtml += `
                        <tr>
                            <td><a href="student/edit?idEdit=${item.id}"><button type="button" class="btn bx bxs-edit-alt btn-button"></button></a></td>
                            <td>${item.id}</td>
                            <td>${item.name}</td>
                            <td>${item.score}</td>
                            <td><button type="button" class="btn btn-danger" onclick="sendFetchDelete(${item.id})">X</button></td>
                        </tr>
                        `

                        }
                        html = html.replace('opacity: 0; margin-left: -55px;', 'opacity: 1; margin-left: 0px;');
                        html = html.replace('{item}', itemsHtml);
                        res.write(html);
                        res.end();
                    });
                }
            });
        }
    }

    sortById(req, res) {
        const urlObject = url.parse(req.url, true);
        let test = studentServices.sortByID(urlObject.query.id);
        console.log(test)
        res.write("sorted");
        res.end();
    }

    reSortById(req, res) {
        const urlObject = url.parse(req.url, true);
        let test = studentServices.reSortByID(urlObject.query.id);
        console.log(test)
        res.write("sorted");
        res.end();
    }

}    

function showList(req, res) {
    fs.readFile('view/student/studentList.html', 'utf-8', (err, html) => {
        let list = studentServices.findAll();
        let itemsHtml = '';
        for (const item of list) {     
            itemsHtml += `
                        <tr>
                            <td><a href="student/edit?idEdit=${item.id}"><button type="button" class="btn bx bxs-edit-alt btn-button"></button></a></td>
                            <td>${item.id}</td>
                            <td>${item.name}</td>
                            <td>${item.score}</td>
                            <td><button type="button" class="btn btn-danger" onclick="sendFetchDelete(${item.id})">X</button></td>
                        </tr>
                        `
        }
        html = html.replace('{item}', itemsHtml);
        res.write(html);
        res.end();
    })
}

export default new StudentController()