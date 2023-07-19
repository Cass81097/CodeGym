import productService from "../services/productService.js";
import fs from "fs";
import url from "url";

class ProductController {
    constructor() { }

    async infoProduct(req, res) {
        try {
            let stringHTML = await fs.promises.readFile(
                'views/product/detail.html',
                'utf-8'
            );
            res.write(stringHTML);
            res.end();

        } catch (err) {
            console.error(err);
            res.sendStatus(500);
        }
    }

    async findAll(req, res) {
        try {
            let stringHTML = await fs.promises.readFile(
                'views/product/list.html',
                'utf-8'
            );
            let str = '';
            const urlObject = url.parse(req.url, true)
            const keyword = urlObject.query.search ?? '';
            const products = await productService.findAllProduct(keyword);

            if (products.length === 0) {

                str = `<h4>Không có sản phẩm phù hợp</h4>`
            } else {

                for (const item of products) {
                    str += `
                    <h1>${item.id}. ${item.name}, ${item.price}, ${item.quantity}</h1>
                    <button><a href="products/detail?${item.name}">See More</a></button>
                    <button onclick="handleDelete('${item.name}')">Delete</button>
                    <button><a href="products/edit?idEdit=${item.id}">Edit</a></button>
                    `
                }
            }

            stringHTML = stringHTML.replaceAll('{list}', str);
            stringHTML = stringHTML.replaceAll('{key}', keyword)
            res.write(stringHTML);
            res.end();

        } catch (err) {
            console.error(err);
            res.sendStatus(500);
        }
    }

    async showAddForm(req, res) {
        try {
            const stringHTML = await fs.promises.readFile(
                'views/product/add.html',
                'utf-8'
            );
            res.write(stringHTML);
            res.end();

        } catch (err) {
            console.error(err);
            res.sendStatus(500);
        }
    }

    async addProduct(req, res) {
        try {
            await productService.save(req.body);
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(`<script>alert("Them san pham '${req.body.name}' thanh cong!"); window.location.href = '/api/products';</script>`);
            res.end();
        } catch (err) {
            console.error(err);
            res.sendStatus(500);
        }
    }
    

    async showEditForm(req, res) {
        try {
            let updatedStringHTML = await fs.promises.readFile(
                'views/product/edit.html',
                'utf-8'
            );
            const urlObject = url.parse(req.url, true);
            const productID = urlObject.query.idEdit
            const product = await productService.findById(productID);
            updatedStringHTML = updatedStringHTML.replace('{id}', product.id);
            updatedStringHTML = updatedStringHTML.replace('{name}', product.name);
            updatedStringHTML = updatedStringHTML.replace('{price}', product.price);
            updatedStringHTML = updatedStringHTML.replace('{quantity}', product.quantity);
            updatedStringHTML = updatedStringHTML.replace('{image}', product.image);
            res.write(updatedStringHTML);
            res.end();

        } catch (err) {
            console.error(err);
            res.sendStatus(500);
        }
    }


    async editProduct(req, res) {
        try {
            await productService.update(req.body);
            // res.writeHead(302, {
            //     Location: '/api/products'
            // });
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(`<script>alert("Sua san pham thanh cong!"); window.location.href = '/api/products';</script>`);
            res.end();

        } catch (err) {
            console.error(err);
            res.sendStatus(500);
        }
    }

    async deleteProduct(req, res) {
        try {
            const urlObject = url.parse(req.url, true);
            const productName = urlObject.query.name;
            const result = await productService.deleteProductByName(productName);

            if (typeof result === 'string') {
                res.sendStatus(500);
            } else {
                res.write('Deleted');
                res.end();    
            }
        } catch (err) {
            console.error(err);
            res.sendStatus(500);
        }
    }
    
}

export default new ProductController();
