"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const class_1 = require("../entity/class");
const data_source_1 = require("../data-source");
class ClassService {
    constructor() {
        this.getAll = async () => {
            let classes = await this.classRepository.find();
            return classes;
        };
        this.saveClass = async (product) => {
            let results = await this.classRepository.save(product);
            return results;
        };
        this.searchClass = async (classes) => {
            let results = await this.classRepository.findOne({ where: { id: classes } });
            return results;
        };
        this.updateStudent = async (cID, classes) => {
            let classEdited = await this.classRepository.findOne({ where: { id: cID } });
            this.classRepository.merge(classEdited, classes);
            let results = await this.classRepository.save(classEdited);
            return results;
        };
        this.deleteClassById = async (classes) => {
            let results = await this.classRepository.delete(classes);
            return results;
        };
        this.classRepository = data_source_1.AppDataSource.getRepository(class_1.Class);
    }
}
exports.default = new ClassService();
//# sourceMappingURL=classService.js.map