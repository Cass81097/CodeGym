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

    searchProduct(keyword) {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM product WHERE id like '%${keyword}%' or name like '%${keyword}%'`, (err, products) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(products)
                }
            })
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

    deleteProductByID(productId) {
        return new Promise((resolve, reject) => {
            db.query(`DELETE FROM product WHERE id = ${productId}`, (err, products) => {
            if (err) {
              if (err.code === 'ER_ROW_IS_REFERENCED_2' || err.code === 'ER_NO_REFERENCED_ROW') {
                const error = `Không thể xóa sản phẩm có ID = ${productId} vì đang có ràng buộc với dữ liệu khác (database)`;
                // console.log(error);
                resolve(error);
              } else {
                reject(err);
              }
            } else {
              console.log('Xóa thành công!');
              resolve(products);
            }
          });
        });
    }

    deleteProductByName(productName) {
        return new Promise((resolve, reject) => {
            db.query(`DELETE FROM product WHERE name = '${productName}'`, (err, products) => {
            if (err) {
              if (err.code === 'ER_ROW_IS_REFERENCED_2' || err.code === 'ER_NO_REFERENCED_ROW') {
                const error = `Không thể xóa sản phẩm ${productName} vì đang có ràng buộc với dữ liệu khác (database)`;
                // console.log(error);
                resolve(error);
              } else {
                reject(err);
              }
            } else {
              console.log('Xóa thành công!');
              resolve(products);
            }
          });
        });
    }
}

export default new ProductService();
