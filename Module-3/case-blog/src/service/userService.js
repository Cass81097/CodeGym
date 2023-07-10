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
            connection.getConnection().query(
                `insert into accounts (username, password, passConfirm, name, phone, address, email)
                 values ('${user.username}', '${user.password}', '${user.passConfirm}', '${user.name}', '${user.phone}', '${user.address}', '${user.email}')`,
                (err, products) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(products[0])
                }
            })
        })
    }

}

export default new UserService();
