import fs from "fs";

let productRouter = {
    '/products': (req, res) => {
        fs.readFile('view/product/list.html', 'utf-8', (err, stringHTML) => {
            res.write(stringHTML);
            res.end();
        })
    },
    '/add-product': (req, res) => {
        fs.readFile('view/product/add.html', 'utf-8', (err, stringHTML) => {
            res.write(stringHTML);
            res.end();
        })
    },
}
export default productRouter;
