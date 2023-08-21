import {User} from "../entity/User";
import {AppDataSource} from "../data-source";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {SECRET} from "../middleware/jwt";

class UserService  {
    private UserRepository;

    constructor() {
        this.UserRepository = AppDataSource.getRepository(User);
    }

    register = async (user) => {
        user.password = await bcrypt.hash(user.password, 10);
        return this.UserRepository.save(user);
    }

    checkLogin = async (username,password) =>{
      const row = await this.UserRepository.find({
            where : {
                username : username,
                password : password
            }
        })
        return row.length === 1;
    }

    checkUser = async (user) => {
        let userFind = await this.UserRepository.findOneBy({username: user.username});
        if (!userFind) {
            return 'User is not exist'
        } else {
            let passWordCompare = await bcrypt.compare(user.password, userFind.password);
            if (passWordCompare) {
                let payload = {
                    idUser: userFind.id,
                    username: userFind.username,
                    // role: 'admin'
                }
                return jwt.sign(payload, SECRET, {
                    expiresIn: 36000 * 10 * 100
                })
            } else {
                return 'Password is wrong'
            }
        }
    }

}

export default new UserService();
