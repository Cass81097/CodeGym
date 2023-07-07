import fs from "fs";
import blogService from "../service/blogService.js";
import categoryService from "../service/categoryService.js";
import qs from "qs";

class BlogController {

    showAll(req, res) {
        fs.readFile('view/blog/list.html', 'utf-8', (err, stringHTML) => {
            let str = '';
            blogService.findAll().then((blogs)=> {
                for (const item of blogs) {
                    str += `
                    <h3>${item.id}. ${item.title}, ${item.content}, ${item.name}</h3>
                    `
                }
                stringHTML = stringHTML.replace('{list}', str)
                res.write(stringHTML);
                res.end();
            })
        }) 
    }

    add(req,res) {
        let data = '';
        req.on('data', dataRaw => {
            data += dataRaw;
        })

        req.on('end', () => {
            if (req.method === 'GET') { 
                fs.readFile('view/blog/add.html', 'utf-8', (err, stringHTML) => {
                    categoryService.findAll().then(categories => {
                        let str = '';
                        for (const item of categories) {
                            str += `
                            <option value="${item.id}">${item.name}</option>      
                            `
                        }
                    stringHTML = stringHTML.replace('{listCategory}', str)
                    res.write(stringHTML);
                    res.end();
                    })
                })
            } else {
                data = qs.parse(data);
                blogService.save(data).then(() => {
                    res.writeHead(302, {
                        Location: '/blogs',
                        });
                    res.end();
                })
            }      
        }
    )}
}

export default new BlogController();
