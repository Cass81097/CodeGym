import connection from "../connection.js";


class InformationService {
    constructor() {
        connection.connecting();
    }

    findById(id) {
        return new Promise((resolve, reject) => {
            connection.getConnection().query(`select * from account where accountId =${id} `, (err, information) => {
                if (err) {
                    reject(err)
                } else {
                    // console.log(informations[0])
                    resolve(information[0])
                }
            })
        })
    }

    findPostById(id) {
        return new Promise((resolve, reject) => {
            connection.getConnection().query(`select * from post where accId =${id} `, (err, information) => {
                if (err) {
                    reject(err)
                } else {
                    // console.log(informations[0])
                    resolve(information[0])
                }
            })
        })
    }

    update(information) {
        return new Promise((resolve, reject) => {
            let sql = `UPDATE account SET name = ?, phone = ?, college = ?, address = ?, email = ?, avatar = ?, cover_photo = ? WHERE accountId = ?`;
            let values = [information.name, information.phone, information.college, information.address, information.email, information.avatar, information.cover_photo, information.accountId];
    
            connection.getConnection().query(sql, values, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    console.log('Sửa thành công!');
                    resolve(result);
                }
            });
        });
    }
    

    deletePost(id) {
        return new Promise((resolve, reject) => {
          connection.getConnection().query(`DELETE FROM post WHERE postId = ${id}`, (err, products) => {
            if (err) {
              if (err.code === 'ER_ROW_IS_REFERENCED_2' || err.code === 'ER_NO_REFERENCED_ROW') {
                const error = 'Không thể xóa vì đang có ràng buộc với dữ liệu khác.';
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
}

export default new InformationService();
