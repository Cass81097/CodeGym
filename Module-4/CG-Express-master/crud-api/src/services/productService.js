import db from "../config/database.js";

class ProductService {
    constructor() {
    }

    findAll() {
        return new Promise((resolve, reject) => {
            db.query('select * from product', (err, products) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(products);
                }
            });
        })
    }

    save(product) {
        return new Promise((resolve, reject) => {
            db.query(`insert into product values (${product.id}, '${product.name}', ${product.price}, ${product.quantity}, ${product.image});`, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })
    }

    findById(id) {
        return new Promise((resolve, reject) => {
            db.query(`select * from product where id =${id} `, (err, products) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(products[0])
                }
            })
        })
    }

    update(product) {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE product SET name = '${product.name}', price = ${product.price}, quantity = ${product.quantity}, image = '${product.image}' WHERE id = ${product.id}`, (err, products) => {
                if (err) {
                    reject(err)
                } else {
                    console.log(`Sửa thành công!`)
                    resolve(products)
                }
            })          
        })
    }
}

export default new ProductService();
