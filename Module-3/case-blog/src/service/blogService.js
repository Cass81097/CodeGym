import connection from "../connection.js";


class BlogService {
    constructor() {
        connection.connecting();
    }

    findAll() {
        return new Promise((resolve, reject) => {   
            const sql = `SELECT *
            FROM post 
            JOIN information on post.accId = information.accId; `
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
            const sql = `INSERT INTO blog.post (accId, content, image) VALUES (${blog.accId}, '${blog.content}', '${blog.image}');`
            connection.getConnection().query(sql, (err, rs) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(rs)
                }
            })
        })
    }

    findProfile() {
        return new Promise((resolve, reject) => {
            connection.getConnection().query('select * from post', (err, list) => {
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

export default new BlogService();
