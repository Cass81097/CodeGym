import { Request, Response } from "express";
import studentService from "../service/studentService";

class studentController {
    findAll = async (req: Request, res: Response) => {
        let { minPoint, maxPoint, asc, desc } = req.query;
        // console.log({ minPoint, maxPoint, asc, desc });
        if (minPoint === undefined && maxPoint === undefined && asc === undefined && desc === undefined) {
            let listStudent = await studentService.getAll();
            res.json(listStudent);
        } else if (minPoint !== undefined && maxPoint !== undefined) {
            let results = await studentService.searchStudentsByPointRange(Number(minPoint), Number(maxPoint));
            res.json(results);
        } else if (asc == '') {
            let resultsAsc = await studentService.getAllByASC();
            console.log(resultsAsc);
            res.json(resultsAsc);
        } else if (desc == '') {
            let resultsDesc = await studentService.getAllByDESC();
            console.log(resultsDesc);
            res.json(resultsDesc);
        } else {
            res.status(400).json({ message: 'Error!' });
        }
    }

    searchStudent = async (req: Request, res: Response) => {
        let id = req.query.id;
        let name = req.query.name as string;

        if (id !== undefined) {
            let results = await studentService.searchStudentById(id);
            res.json(results);
        } else if (name !== undefined) {
            let results = await studentService.searchStudentByName(name);
            res.json(results);
        } else {
            res.status(400).json({ message: 'Error!' });
        }
    }

    findAllStudentByClass = async (req: Request, res: Response) => {
        let liststudent = await studentService.getAllStudentByClass(req.query.id);
        res.json(liststudent);
    }

    addStudent = async (req: Request, res: Response) => {
        let results = await studentService.saveStudent(req.body);
        console.log(req.body);
        res.json(results);
    }

    updateStudent = async (req: Request, res: Response) => {
        try {
            let indexStudent = await studentService.searchStudentById(req.query.id);
            let sID = req.query.id;
            let student = req.body;
            let results = await studentService.updateStudent(sID, student);

            if (
                indexStudent.name !== results.name ||
                indexStudent.age !== results.age ||
                indexStudent.point !== results.point ||
                indexStudent.class !== results.class
            ) {
                res.json('Sửa thành công');
            } else {
                res.json(results);
            }
        } catch (error) {
            console.log(error);

            res.status(500).json({ error: 'Error!' });
        }
    };

    deleteStudentById = async (req: Request, res: Response) => {
        await studentService.deleteStudentById(req.query.id);
        res.json(`Xóa thành công sinh viên có ID = ${req.query.id}`);
    }
}
export default new studentController();
