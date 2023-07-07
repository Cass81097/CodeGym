import connection from "../connection.js";


class UserService {
    constructor() {
        connection.connecting();
    }

    checkUser(user) {
        return new Promise((resolve, reject) => {
            connection.getConnection().query(
                `select * from accounts where username = '${user.username}' and password = '${user.password}';`,
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
