import connection from "../connection.js";


class BlogService {
    constructor() {
        connection.connecting();
    }

    findAll() {
        return new Promise((resolve, reject) => {   
            const sql = `SELECT blog.id, title, content, name 
                        FROM demo2006.blog 
                        JOIN category on idCategory = category.id; `
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
    // INSERT INTO `demo2006`.`blog` (`id`, `title`, `content`, `idCategory`) VALUES ('3', 'Đua xe', 'Đam mê', '1');

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
