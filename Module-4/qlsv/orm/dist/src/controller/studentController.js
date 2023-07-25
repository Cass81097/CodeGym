"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const studentService_1 = __importDefault(require("../service/studentService"));
class studentController {
    constructor() {
        this.findAll = async (req, res) => {
            let { minPoint, maxPoint, asc, desc } = req.query;
            if (minPoint === undefined && maxPoint === undefined && asc === undefined && desc === undefined) {
                let listStudent = await studentService_1.default.getAll();
                res.json(listStudent);
            }
            else if (minPoint !== undefined && maxPoint !== undefined) {
                let results = await studentService_1.default.searchStudentsByPointRange(Number(minPoint), Number(maxPoint));
                res.json(results);
            }
            else if (asc == '') {
                let resultsAsc = await studentService_1.default.getAllByASC();
                console.log(resultsAsc);
                res.json(resultsAsc);
            }
            else if (desc == '') {
                let resultsDesc = await studentService_1.default.getAllByDESC();
                console.log(resultsDesc);
                res.json(resultsDesc);
            }
            else {
                res.status(400).json({ message: 'Error!' });
            }
        };
        this.searchStudent = async (req, res) => {
            let id = req.query.id;
            let name = req.query.name;
            if (id !== undefined) {
                let results = await studentService_1.default.searchStudentById(id);
                res.json(results);
            }
            else if (name !== undefined) {
                let results = await studentService_1.default.searchStudentByName(name);
                res.json(results);
            }
            else {
                res.status(400).json({ message: 'Error!' });
            }
        };
        this.findAllStudentByClass = async (req, res) => {
            let liststudent = await studentService_1.default.getAllStudentByClass(req.query.id);
            res.json(liststudent);
        };
        this.addStudent = async (req, res) => {
            let results = await studentService_1.default.saveStudent(req.body);
            console.log(req.body);
            res.json(results);
        };
        this.updateStudent = async (req, res) => {
            try {
                let indexStudent = await studentService_1.default.searchStudentById(req.query.id);
                let pID = req.query.id;
                let student = req.body;
                let results = await studentService_1.default.updateStudent(pID, student);
                if (indexStudent.name !== results.name ||
                    indexStudent.age !== results.age ||
                    indexStudent.point !== results.point ||
                    indexStudent.class !== results.class) {
                    res.json('Sửa thành công');
                }
                else {
                    res.json(results);
                }
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ error: 'Error!' });
            }
        };
        this.deleteStudentById = async (req, res) => {
            await studentService_1.default.deleteStudentById(req.query.id);
            res.json(`Xóa thành công sinh viên có ID = ${req.query.id}`);
        };
    }
}
exports.default = new studentController();
//# sourceMappingURL=studentController.js.map