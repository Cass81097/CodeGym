import connection from "../connection.js";


class ProductService {
    constructor() {
        connection.connecting();
    }

    findAll() {
        return new Promise((resolve, reject) => {
            connection.getConnection().query('select * from product', (err, products) => {
                if (err) {
                    reject(err)
                } else {
                    // console.log(products)
                    resolve(products)
                }
            })
        })
    }

    save(product) {
        return new Promise((resolve, reject) => {
            connection.getConnection().query(`INSERT INTO product VALUES (${product.id}, '${product.name}', ${product.price}, ${product.quantity}, '${product.image}');`, (err, products) => {
                if (err) {
                    reject(err)
                } else {
                    console.log(`Tạo mới thành công!`)
                    resolve(products)
                }
            })          
        })
    }

    findById(id) {
        return new Promise((resolve, reject) => {
            connection.getConnection().query(`select * from product where id =${id} `, (err, products) => {
                if (err) {
                    reject(err)
                } else {
                    // console.log(products[0])
                    resolve(products[0])
                }
            })
        })
    }

    update(product) {
        return new Promise((resolve, reject) => {
            connection.getConnection().query(`UPDATE product SET name = '${product.name}', price = ${product.price}, quantity = ${product.quantity}, image = '${product.image}' WHERE id = ${product.id}`, (err, products) => {
                if (err) {
                    reject(err)
                } else {
                    console.log(`Sửa thành công!`)
                    resolve(products)
                }
            })          
        })
    }

    deleteProduct(productId) {
        return new Promise((resolve, reject) => {
            connection.getConnection().query(`DELETE FROM product WHERE id = ${productId}`, (err, products) => {
                if (err) {
                    reject(err);
                } else {
                    console.log(`Xóa thành công!`);
                    resolve(products);
                }
            });
        });
    }    
}

export default new ProductService();
