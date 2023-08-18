import {Request, Response} from "express";
import UserService from "../service/UserService";


class UserController {


    register = async (req: Request, res: Response) => {
        await UserService.register(req.body);
        res.status(201).json('Create user success')
    }

    login = async (req: Request, res: Response) => {
        let resultCheck = await UserService.checkUser(req.body);
        res.status(200).json(resultCheck);
    }
    check = async (req: Request, res: Response) => {
        console.log(req.body)
        let check = await UserService.checkLogin(req.body.username,req.body.password)

        res.json(check)
    }


}

export default new UserController();