import productService from "../services/productService.js";
import fs from "fs";


class ProductController {
    constructor() {
    }

    findAll(req, res) {
        fs.readFile('views/product/list.html', 'utf-8', (err, stringHTML) => {
            let str = '';
            productService.findAll().then((products) => {
                for (const item of products) {
                    str += `<h1>${item.name}, ${item.price}</h1>`;
                }
                stringHTML = stringHTML.replace('{list}', str)
                res.write(stringHTML);
                res.end();
            })
        })
    }

    showAddForm(req, res) {
        fs.readFile('views/product/add.html', 'utf-8', (err, stringHTML) => {
            res.write(stringHTML);
            res.end();
        })

    }
    add(req, res) {
        productService.save(req.body).then(() => {
            res.writeHead(301,{'location':'/api/products'})
            res.end()
        })
    }

}

export default new ProductController();
