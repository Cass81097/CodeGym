import connection from "../connection.js";


class ProductService {
    constructor() {
        connection.connecting();
    }

    findAllAtHome() {
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

    findAll(keyword) {
        return new Promise((resolve, reject) => {
            connection.getConnection().query(`SELECT * FROM product WHERE id like '%${keyword}%' or name like '%${keyword}%'`, (err, products) => {
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
              if (err.code === 'ER_ROW_IS_REFERENCED_2' || err.code === 'ER_NO_REFERENCED_ROW') {
                const error = 'Không thể xóa sản phẩm này vì đang có ràng buộc với dữ liệu khác.';
                console.log(error);
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
      
    findProduct(product) {
        return new Promise((resolve, reject) => {
            connection.getConnection().query(`SELECT * FROM products WHERE name LIKE ${product}%`, (err, products) => {
                if (err) {
                    reject(err);
                } else {
                    console.log(`Tìm thành công!`);
                    resolve(products);
                }
            });
        });
    }    

    sortProduct() {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM demo2006.product
                         ORDER BY price DESC;`;
            connection.getConnection().query(sql, (err, rs) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rs);
                }
            });
        });
    }

    sortId() {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM demo2006.product
                         ORDER BY id DESC;`;
            connection.getConnection().query(sql, (err, rs) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rs);
                }
            });
        });
    }
}

export default new ProductService();
