import connection from "../connection.js";


class CategoryService {
    constructor() {
        connection.connecting();
    }

    findAll() {
        return new Promise((resolve, reject) => {
            connection.getConnection().query('select * from category', (err, list) => {
                if (err) {
                    reject(err)
                } else {
                    // console.log(list)
                    resolve(list)
                }
            })
        })
    }
}

export default new CategoryService();
