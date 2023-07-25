"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const classService_1 = __importDefault(require("../service/classService"));
class classController {
    constructor() {
        this.findAll = async (req, res) => {
            let listclass = await classService_1.default.getAll();
            res.json(listclass);
        };
        this.addClass = async (req, res) => {
            let results = await classService_1.default.saveClass(req.body);
            console.log(req.body);
            res.json(results);
        };
        this.searchClassById = async (req, res) => {
            let results = await classService_1.default.searchClass(req.params.id);
            res.json(results);
        };
        this.deleteClassById = async (req, res) => {
            await classService_1.default.deleteClassById(req.params.id);
            res.json('Xóa thành công sản phẩm!');
        };
        this.updateClass = async (req, res) => {
            try {
                let indexClass = await classService_1.default.searchClass(req.query.id);
                let pID = req.query.id;
                let classes = req.body;
                let results = await classService_1.default.updateStudent(pID, classes);
                if (indexClass.name !== results.name ||
                    indexClass.teacherName !== results.teacherName ||
                    indexClass.totalStudent !== results.totalStudent) {
                    res.json('Sửa thành công');
                }
                else {
                    res.json(results);
                }
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        };
    }
}
exports.default = new classController();
//# sourceMappingURL=classController.js.map