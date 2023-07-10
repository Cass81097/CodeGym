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

    showListAll(req, res) {
        let data = '';
        req.on('data', dataRaw => {
            data += dataRaw;
        })
        req.on('end', () => {
            if (req.method === 'GET') {
                showListProduct(req, res);
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
                    res.end();
                })
            }
        })
    }

    delete(req, res) {
        const urlObject = url.parse(req.url, true);
        const productId = urlObject.query.id;
        productService.deleteProduct(productId).then(() => {
            res.write("Deleted");
            res.end();
        });
    }

    sortByPrice(req, res) {
        fs.readFile('view/product/sidebar.html', 'utf-8', (err, stringHTML) => {
            let str = '';
            const urlObject = url.parse(req.url, true);
            productService.sortProduct(urlObject.query.id).then((products) => {
                for (const product of products) {
                    str += `
                    <div class="col-lg-3 col-md-4 col-sm-6 pb-1">
                    <div class="product-item bg-light mb-4">
                        <div class="featured-button">
                            <a href="products/edit-product?idEdit=${product.id}">
                            <button id ="edit-icon" class="edit"><span class="edit-icon"></span></button>
                            </a>
                            <button class="btn-remove btn-delete-remove" onclick="sendFetchDelete(${product.id})">
                                <span class="mdi mdi-delete mdi-24px"></span>
                                <span class="mdi mdi-delete-empty mdi-24px"></span>
                            </button>
                        </div>
                        <div class="product-img position-relative overflow-hidden">
                            <img class="img-fluid w-100" src="${product.image}" alt="">
                        </div>
                        <div class="text-center py-4">
                            <small>ID: ${product.id} - ${product.name}</small>
                            <div class="price">
                                <h5>$${product.price}</h5>
                                <div class="id-quantity">
                                    <i class='bx bx-cart icon-cart'></i>
                                    <small>${product.quantity}</small>
                                </div>
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

    sortById(req, res) {
        fs.readFile('view/product/sidebar.html', 'utf-8', (err, stringHTML) => {
            let str = '';
            const urlObject = url.parse(req.url, true);
            productService.sortId(urlObject.query.id).then((products) => {
                for (const product of products) {
                    str += `
                    <div class="col-lg-3 col-md-4 col-sm-6 pb-1">
                    <div class="product-item bg-light mb-4">
                        <div class="featured-button">
                            <a href="products/edit-product?idEdit=${product.id}">
                            <button id ="edit-icon" class="edit"><span class="edit-icon"></span></button>
                            </a>
                            <button class="btn-remove btn-delete-remove" onclick="sendFetchDelete(${product.id})">
                                <span class="mdi mdi-delete mdi-24px"></span>
                                <span class="mdi mdi-delete-empty mdi-24px"></span>
                            </button>
                        </div>
                        <div class="product-img position-relative overflow-hidden">
                            <img class="img-fluid w-100" src="${product.image}" alt="">                  
                        </div>
                        <div class="text-center py-4">
                            <small>ID: ${product.id} - ${product.name}</small>
                            <div class="price">
                                <h5>$${product.price}</h5>
                                <div class="id-quantity">
                                    <i class='bx bx-cart icon-cart'></i>
                                    <small>${product.quantity}</small>
                                </div>
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
}

function showList(req, res) {
    fs.readFile('view/product/sidebar.html', 'utf-8', (err, stringHTML) => {
        let str = '';
        const urlObject = url.parse(req.url, true)
        const keyword = urlObject.query.keyword ?? '';
        productService.findAll(keyword).then((products) => {
            if (products.length === 0) {
                str = `<h4>Không có sản phẩm phù hợp</h4>`
            } else {
                for (const product of products) {
                    str += `
                    <div class="col-lg-3 col-md-4 col-sm-6 pb-1">
                        <div class="product-item bg-light mb-4">
                            <div class="featured-button">
                                <a href="products/edit-product?idEdit=${product.id}">
                                <button id ="edit-icon" class="edit"><span class="edit-icon"></span></button>
                                </a>
                                <button class="btn-remove btn-delete-remove" onclick="sendFetchDelete(${product.id})">
                                    <span class="mdi mdi-delete mdi-24px"></span>
                                    <span class="mdi mdi-delete-empty mdi-24px"></span>
                                </button>
                            </div>
                            <div class="product-img position-relative overflow-hidden">
                                <img class="img-fluid w-100" src="${product.image}" alt="">
                                
                            </div>
                            <div class="text-center py-4">
                                <small>ID: ${product.id} - ${product.name}</small>
                                <div class="price">
                                    <h5>$${product.price}</h5>
                                    <div class="id-quantity">
                                        <i class='bx bx-cart icon-cart'></i>
                                        <small>${product.quantity}</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    `
                }
            }
            stringHTML = stringHTML.replaceAll('{list}', str)
            stringHTML = stringHTML.replaceAll('{key}', keyword)
            res.write(stringHTML);
            res.end();
        })
    })
}

function showListProduct(req, res) {
    fs.readFile('view/home.html', 'utf-8', (err, stringHTML) => {
        let str = '';
        productService.findAllAtHome().then((products) => {
            for (const product of products) {
                str += `
                <div class="col-lg-3 col-md-4 col-sm-6 pb-1">
                    <div class="product-item bg-light mb-4">
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
            stringHTML = stringHTML.replace('{list-product}', str)
            res.write(stringHTML);
            res.end();
        })
    })
}

export default new ProductController();


 // showHome = async (req, res) => {
    //     let userID = await userController.getUserID(req)
    //     if (userID) {
    //         // console.log('UserId', userID, 'signed in');
    //         fs.readFile('view/blog/home.html', 'utf-8', (err, stringHTML) => {
    //             let str1 = '';
    //             let str2 = '';
    //             let str3 = '';
    //             let str4 = '';
    //             let str5 = '';

    //             blogService.findAllByIdAccount(userID).then((blogs) => {
    //                 for (const blog of blogs) {
    //                     str1 = `
    //                     <div class="ava">
    //                     <a href=""><i class="bx avatar online" data-bs-toggle="tooltip" data-bs-placement="bottom"
    //                         title="Tài khoản" style="background-image: url('${blog.avatar}')"></i></a>
    //                         </div>
    //                 `

    //                     str2 = `
    //                 <li class="links link-avatar">
    //                 <a href="">
    //                 <div class="left-ava"><i class="bx left-avatar" style="background-image: url('${blog.avatar}');"></i></div>
    //                 <span style="margin-left: 5px;" class="text nav-text">${blog.name}</span>
    //                 </a>
    //                 </li>
    //                 `

    //                     str3 = `
    //                 <div class="story" style="background-image: linear-gradient(transparent, rgba(0,0,0,0.5)), url('${blog.avatar}');">
    //                 <img src="../../img/upload.png" alt="">
    //                 <h6>Tạo tin</h6>
    //                 </div> 
    //                 `

    //                     str4 = `
    //                 <div class="user-profile">
    //                 <img src="${blog.avatar}">
    //                 <div>
    //                 <p>${blog.name}</p>
    //                 <small>Public
    //                 <i class="fas fa-caret-down"></i>
    //                 </small>
    //                 </div>
    //                 </div>
    //                 `

    //                     str5 += `
    //                     <div class="index-content">
    //                 <div class="post-container">
    //                 <div class="user-profile">
    //                 <img src="${blog.avatar}">
    //                 <div>
    //                 <p>${blog.name}</p>
    //                 <div class="time-status">
    //                 <span>8 tháng 7 lúc 20:20</span>
    //                 <i class="fas fa-globe-americas" style="color: #65676B;"></i>
    //                 </div>
    //                     </div>
    //                 </div>
    //                 <div class="post-user">
    //                 <p class="post-text">${blog.content}</p>
    //                 <img src="${blog.image}" class="post-img">
    //                 <div class="activity-icons">                         
    //                 </div>
    //                 </div>
    //                 </div>
    //                 </div>
    //                 `
    //                 }
    //                 stringHTML = stringHTML.replace('{avatar}', str1)
    //                 stringHTML = stringHTML.replace('{sidebar-avatar}', str2)
    //                 stringHTML = stringHTML.replace('{story-avatar}', str3)
    //                 stringHTML = stringHTML.replace('{write-avatar}', str4)
    //                 stringHTML = stringHTML.replace('{index-content}', str5)
    //                 res.write(stringHTML);
    //                 res.end();
    //             })
    //         })
    //     }
    // }