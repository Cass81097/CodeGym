import connection from "../connection.js";


class BlogService {
    constructor() {
        connection.connecting();
    }

    findAll() {
        return new Promise((resolve, reject) => {   
            const sql = `SELECT *
            FROM information 
            JOIN post on postId = information.accId; `
            connection.getConnection().query(sql, (err, list) => {
                if (err) {
                    reject(err)
                } else {
                    // console.log(list)
                    resolve(list)
                }
            })
        })
    }  

    findAllByIdAccount(userId) {
        return new Promise((resolve, reject) => {   
            const sql = `SELECT *
            FROM information 
            JOIN post on postId = information.accId
            WHERE information.accId = ${userId}; `
            connection.getConnection().query(sql, (err, list) => {
                if (err) {
                    reject(err)
                } else {
                    // console.log(list)
                    resolve(list)
                }
            })
        })
    }  

    save(blog) {
        return new Promise((resolve, reject) => {   
            const sql = `INSERT INTO blog (title, content, idCategory) VALUES ('${blog.title}', '${blog.content}', '${blog.category}');`
            connection.getConnection().query(sql, (err, rs) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(rs)
                }
            })
        })
    }
}

export default new BlogService();
