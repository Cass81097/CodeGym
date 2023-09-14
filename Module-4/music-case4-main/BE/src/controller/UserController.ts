import {Request, Response} from "express";
import userService from "../service/UserService";
import cookie from 'cookie';
const session = require('express-session');

class UserController {

    // register = async (req: Request, res: Response) => {
    //    let result = await userService.register(req.body);
    //     res.json(result)
    // }

    // login = async (req: Request, res: Response) => {
    //     let resultCheck = await userService.checkUser(req.body); 
    //     res.status(200).json(resultCheck);
    // }

    register = async (req: Request, res: Response) => {
        await userService.register(req.body);
        res.status(201).json('Create user success')
    }

    login = async (req: Request, res: Response) => {
        let resultCheck = await userService.checkUser(req.body);
        res.status(200).json(resultCheck);   
    }
    
    check = async (req: Request, res: Response) => {
        console.log(req.body)
        let check = await userService.checkLogin(req.body.username,req.body.password)
        res.json(check)
    }

    findAll = async (req: Request, res: Response) => {
        let {id, name} = req.query
        if (id == undefined && name == undefined){
            let data = await userService.findAll()
            res.json(data)
        } else if (id != undefined && name == undefined) {
            let data = await userService.findById(id)
            res.json(data)
        } else if (id == undefined && name != undefined){
            let data = await userService.findByName(name)
            res.json(data)
        }
    }
}

export default new UserController();
