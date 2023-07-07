import mysql from "mysql";

class Connection {
    configToMySQL = {
        host: '127.0.0.1',
        user: 'root',
        password: '123456',
        database: 'blog',
        charset: 'utf8_general_ci'
    }

    getConnection() {
        return mysql.createConnection(this.configToMySQL);
    }

    connecting() {
        this.getConnection().connect(error => {
            if (error) {
                console.log(error);
            } else {
                // console.log('Connection Success !!!')
            }
        });
    }
}

export default new Connection();
