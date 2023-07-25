import { Request, Response } from "express";
import classService from "../service/classService";

class classController {
    findAll = async (req: Request, res: Response) => {
        let listclass = await classService.getAll();
        res.json(listclass);
    }
    
    addClass = async (req: Request, res: Response) => {
        let results = await classService.saveClass(req.body);
        console.log(req.body);
        res.json(results);
    }

    searchClassById = async (req: Request, res: Response) => {
        let results = await classService.searchClass(req.params.id);
        res.json(results);
    }

    deleteClassById = async (req: Request, res: Response) => {
        await classService.deleteClassById(req.params.id);
        res.json('Xóa thành công sản phẩm!');
    }

    updateClass = async (req: Request, res: Response) => {
        try {
            let indexClass = await classService.searchClass(req.query.id);
            let pID = req.query.id;
            let classes = req.body;
            let results = await classService.updateStudent(pID, classes);

            if (
                indexClass.name !== results.name ||
                indexClass.teacherName !== results.teacherName ||
                indexClass.totalStudent !== results.totalStudent 
            ) {
                res.json('Sửa thành công');
            } else {
                res.json(results);
            }
        } catch (error) {
            console.log(error);

            res.status(500).json({ error: 'Internal Server Error' });
        }
    };
}

export default new classController();
