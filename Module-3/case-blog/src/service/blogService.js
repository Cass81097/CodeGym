import connection from "../connection.js";


class BlogService {
    constructor() {
        connection.connecting();
    }

    findAll() {
        return new Promise((resolve, reject) => {   
            const sql = `SELECT *
            FROM account; `
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

    findAllExcept(id) {
        return new Promise((resolve, reject) => {   
            const sql = `
            SELECT *
            FROM account
            WHERE accountId <> ${id};
            `
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

    findAllAndSortBlog() {
        return new Promise((resolve, reject) => {   
            const sql = `SELECT *
            FROM account
            JOIN post ON post.accId = account.accountId
            ORDER BY post.postId DESC;`
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

    findAllById(userId) {
        return new Promise((resolve, reject) => {   
            const sql = `SELECT *
            FROM account 
            JOIN post on post.accId = account.accountId
            WHERE accountId = ${userId}; `
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
            FROM account 
            WHERE account.accountId = ${userId}; `
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

    findAccountAndsortBlog(id) {
        return new Promise((resolve, reject) => {
            let sql = `SELECT *
            FROM account
            JOIN post ON post.accId = account.accountId
            WHERE post.accId = ${id}
            ORDER BY post.postId DESC;`
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
