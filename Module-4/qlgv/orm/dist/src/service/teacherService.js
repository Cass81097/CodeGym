"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../data-source");
const teacher_1 = require("../entity/teacher");
class TeacherService {
    constructor() {
        this.findAll = async () => {
            return await this.repository.find();
        };
        this.add = async (data) => {
            return await this.repository.save(data);
        };
        this.update = async (id, data) => {
            return await this.repository.update(id, data);
        };
        this.delete = async (id) => {
            return await this.repository.delete(id);
        };
        this.findByName = async (name) => {
            return await this.repository.createQueryBuilder("teacher")
                .where("name LIKE :name", { name: `%${name}%` })
                .getMany();
        };
        this.findByAgeRange = async (minAge, maxAge) => {
            return await this.repository.createQueryBuilder("teacher")
                .where("age >= :minAge", { minAge })
                .andWhere("age <= :maxAge", { maxAge })
                .getMany();
        };
        this.findBySalaryRange = async (minSalary, maxSalary) => {
            return await this.repository.createQueryBuilder("teacher")
                .where("salary >= :minSalary", { minSalary })
                .andWhere("salary <= :maxSalary", { maxSalary })
                .getMany();
        };
        this.repository = data_source_1.AppDataSource.getRepository(teacher_1.Teacher);
    }
}
exports.default = new TeacherService();
//# sourceMappingURL=teacherService.js.map