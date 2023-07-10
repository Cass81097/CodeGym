import connection from "../connection.js";


class InformationService {
    constructor() {
        connection.connecting();
    }

    findById(id) {
        return new Promise((resolve, reject) => {
            connection.getConnection().query(`select * from information where accId =${id} `, (err, information) => {
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
            let sql = `UPDATE information SET name = '${information.name}', phone = '${information.phone}', college = '${information.college}', address = '${information.address}', email = '${information.email}', avatar = '${information.avatar}', cover_photo = '${information.cover_photo}' WHERE accId = ${information.accId}`
            connection.getConnection().query(sql, (err, informations) => {
                if (err) {
                    reject(err)
                } else {
                    console.log(`Sửa thành công!`)
                    resolve(informations)
                }
            })          
        })
    }

}

export default new InformationService();
