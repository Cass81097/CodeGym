"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const teacherService_1 = __importDefault(require("../service/teacherService"));
class TeacherController {
    constructor() {
        this.findAll = async (req, res) => {
            let { name, minAge, maxAge, minSalary, maxSalary } = req.query;
            if (name == undefined && minAge == undefined && maxAge == undefined && maxSalary == undefined && minSalary == undefined) {
                let data = await teacherService_1.default.findAll();
                res.json(data);
            }
            else if (name != undefined && minAge == undefined && maxAge == undefined && maxSalary == undefined && minSalary == undefined) {
                let data = await teacherService_1.default.findByName(name);
                res.json(data);
            }
            else if (name == undefined && minAge != undefined && maxAge != undefined && maxSalary == undefined && minSalary == undefined) {
                let data = await teacherService_1.default.findByAgeRange(Number(minAge), Number(maxAge));
                res.json(data);
            }
            else if (name == undefined && minAge == undefined && maxAge == undefined && maxSalary != undefined && minSalary != undefined) {
                let data = await teacherService_1.default.findBySalaryRange(Number(minSalary), Number(maxSalary));
                res.json(data);
            }
        };
        this.add = async (req, res) => {
            await teacherService_1.default.add(req.body);
            res.json('complete');
        };
        this.update = async (req, res) => {
            await teacherService_1.default.update(req.params.id, req.body);
            res.json('complete');
        };
        this.delete = async (req, res) => {
            await teacherService_1.default.delete(req.params.id);
            res.json('complete');
        };
    }
}
exports.default = new TeacherController();
//# sourceMappingURL=teacherController.js.map