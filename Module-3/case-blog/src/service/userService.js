import connection from "../connection.js";


class UserService {
    constructor() {
        connection.connecting();
    }

    checkUser(user) {
        return new Promise((resolve, reject) => {
            connection.getConnection().query(
                `select * from account where username = '${user.username}' and password = '${user.password}';`,
                (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }
            );
        });
    }

    checkUserID = (userID) => {
        return new Promise((resolve, reject) => {
            let query = `select accountId
                         from account
                         where accountId = ${userID}
            `
            // console.log("--checking user ID query:", query)
            connection.getConnection().query(query, (err, ids) => {
                if (err) {
                    reject(err)
                } else {
                    // console.log("find All:", products)
                    if (ids.length > 0) {
                        resolve(true)
                    } else {
                        resolve(false)
                    }
                }
            })
        })
    }


    addUser(user) {
        return new Promise((resolve, reject) => {
            let sql =  `insert into account (username, password, passConfirm, role, name, phone, college, address, email, avatar, cover_photo)
            values ('${user.username}', '${user.password}', '${user.passConfirm}', 'user', 'New User', '', '', '', '', '../../img/home/avatar-default.jpg', '../../img/home/avatar-default.jpg')`
                connection.getConnection().query(sql,(err, users) => {
                        if (err) {
                            reject(err)
                        } else {
                            resolve(users[0])
                        }
                    })
        })
    }

    countUser() {
        return new Promise((resolve, reject) => {
            let sql = `SELECT COUNT(accountId) AS accountCount FROM blog.account;`
            connection.getConnection().query(sql, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }
            );
        });
    }

}

export default new UserService();
