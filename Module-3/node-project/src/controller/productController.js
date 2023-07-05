import fs from "fs";
import productService from "../service/productService.js";
import qs from "qs";
import url from "url";

class ProductController {

    showAll(req, res) {
        let data = '';
        req.on('data', dataRaw => {
            data += dataRaw;
        })
        req.on('end', () => {
            if (req.method === 'GET') {
               showList(req, res);
            } else {
                data = qs.parse(data);
                productService.save(data).then(() => {
                    res.writeHead(302, {
                        Location: '/products',
                        });
                    res.end();
                })
            }
        })
    }

    edit(req, res) {
        let data = '';
        req.on('data', dataRaw => {
            data += dataRaw;
        })
        req.on('end', () => {
            if (req.method === 'GET') {
                fs.readFile('view/product/edit.html', 'utf-8', (err, stringHTML) => {
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

            } else {
                data = qs.parse(data);
                productService.update(data).then(() => {
                    res.writeHead(302, {
                        Location: `/products`,
                    });
                showList(req, res);
                })
            }
        })
    }

    showFormAdd(req, res) {
        fs.readFile('view/product/add.html', 'utf-8', (err, stringHTML) => {
            res.write(stringHTML);
            res.end();
        })
    }

    sideBar(req, res) {
        fs.readFile('view/product/sidebar.html', 'utf-8', (err, stringHTML) => {
            res.write(stringHTML);
            res.end();
        })
    }

    delete(req, res) {
        const urlObject = url.parse(req.url, true);
        const productId = urlObject.query.id;
        // console.log(productId);
        productService.deleteProduct(productId).then(() => {
            res.write("Deleted");
            res.end();
        });
    }
}

function showList(req, res) {
    fs.readFile('view/product/sidebar.html', 'utf-8', (err, stringHTML) => {
        let str = '';
        productService.findAll().then((products)=> {
            for (const product of products) {
                str+=`
                <div class="col-lg-3 col-md-4 col-sm-6 pb-1">
                    <div class="product-item bg-light mb-4">
                        <div class="featured-button">
                            <button class="edit" type="button"><span class="edit-icon"></span>
                            <a class="edit-product" href="products/edit-product?idEdit=${product.id}"></a>
                            </button>
                            <button class="btn-remove btn-delete-remove" onclick="sendFetchDelete(${product.id})">
                                <span class="mdi mdi-delete mdi-24px"></span>
                                <span class="mdi mdi-delete-empty mdi-24px"></span>
                            </button>
                        </div>
                        <div class="product-img position-relative overflow-hidden">
                            <img class="img-fluid w-100" src="${product.image}" alt="">
                            <div class="product-action">
                                <a class="btn btn-outline-dark btn-square" href=""><i class="fa fa-shopping-cart"></i></a>
                                <a class="btn btn-outline-dark btn-square" href=""><i class="far fa-heart"></i></a>
                                <a class="btn btn-outline-dark btn-square" href=""><i class="fa fa-sync-alt"></i></a>
                                <a class="btn btn-outline-dark btn-square" href=""><i class="fa fa-search"></i></a>
                            </div>
                        </div>
                        <div class="text-center py-4">
                            <a class="h6 text-decoration-none text-truncate" href="">${product.name}</a>
                            <div class="d-flex align-items-center justify-content-center mt-2">
                                <h5>$${product.price}</h5>
                            </div>
                            <div class="d-flex align-items-center justify-content-center mb-1">
                                <small class="fa fa-star text-primary mr-1"></small>
                                <small class="fa fa-star text-primary mr-1"></small>
                                <small class="fa fa-star text-primary mr-1"></small>
                                <small class="fa fa-star text-primary mr-1"></small>
                                <small class="fa fa-star-half-alt text-primary mr-1"></small>
                                <small>(99)</small>
                            </div>
                        </div>
                    </div>
                </div>
                `
            }
            stringHTML = stringHTML.replace('{list}', str)
            res.write(stringHTML);
            res.end();
        })
    })
}
{/* <button onclick="sendFetchDelete(${product.id})" type="button" class="remove btn bx bx-x"></button> */}
/* <h6 class="text-muted ml-2"><del>$123.00</del></h6> */
// function showList(req, res) {
//     fs.readFile('view/product/list.html', 'utf-8', (err, stringHTML) => {
//         let str = '';
//         productService.findAll().then((products)=> {
//             for (const product of products) {
//                 str+=`<h3>${product.name}</h3>
//                 <a href="products/edit-product?idEdit=${product.id}"><button type="button" class="btn bx bxs-edit-alt btn-button">Edit</button></a>
//                 <button onclick="sendFetchDelete(${product.id})" type="button" class="btn bx bx-x">X</button>
//                 `
//             }
//             stringHTML = stringHTML.replace('{list}', str)
//             res.write(stringHTML);
//             res.end();
//         })
//     })
// }

export default new ProductController();
