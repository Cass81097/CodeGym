import productService from "../services/productService.js";
import fs from "fs";
import url from "url";


class ProductController {
    constructor() {
    }

    findAll(req, res) {
        fs.readFile('views/product/list.html', 'utf-8', (err, stringHTML) => {
            let str = '';
            productService.findAll().then((products) => {
                for (const item of products) {
                    str += `<h1>${item.name}, ${item.price}, ${item.quantity}</h1>`;
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

    showEditForm(req, res) {
        fs.readFile('views/product/edit.html', 'utf-8', (err, stringHTML) => {
            let urlObject = url.parse(req.url, true)
            productService.findById(urlObject.query.idEdit).then((product) => {
                stringHTML = stringHTML.replace('{id}', product.id);
                stringHTML = stringHTML.replace('{name}', product.name);
                stringHTML = stringHTML.replace('{price}', product.price);
                stringHTML = stringHTML.replace('{quantity}', product.quantity);
                stringHTML = stringHTML.replace('{image}', product.image);
                res.write(stringHTML);
                res.end();
            });
        })
    }

    addProduct(req, res) {
        productService.save(req.body).then(() => {
            res.writeHead(301,{'location':'/api/products'})
            res.end()
        })
    }

    editProduct(req, res) {
        productService.update(req.body).then(() => {
            res.writeHead(301,{'location':'/api/products'})
            res.end()
        })
    }

}

export default new ProductController();
