"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const students_1 = require("../entity/students");
const data_source_1 = require("../data-source");
class StudentService {
    constructor() {
        this.getAll = async () => {
            let students = await this.studentRepository.find({
                relations: {
                    classRef: true
                }
            });
            return students;
        };
        this.searchStudentsByPointRange = async (minPoint, maxPoint) => {
            let students = await this.studentRepository
                .createQueryBuilder("students")
                .where("students.point >= :minPoint", { minPoint })
                .andWhere("students.point <= :maxPoint", { maxPoint })
                .getMany();
            return students;
        };
        this.getAllByASC = async () => {
            let students = await this.studentRepository.find({
                relations: {
                    classRef: true
                },
                order: {
                    point: "ASC"
                }
            });
            return students;
        };
        this.getAllByDESC = async () => {
            let students = await this.studentRepository.find({
                relations: {
                    classRef: true
                },
                order: {
                    point: "DESC"
                }
            });
            return students;
        };
        this.getAllStudentByClass = async (classId) => {
            let students = await this.studentRepository
                .createQueryBuilder("students")
                .leftJoinAndSelect("students.classRef", "class")
                .select(["students.id", "students.name", "students.age", "students.point"])
                .where("class.id = :classId", { classId })
                .getMany();
            return students;
        };
        this.saveStudent = async (student) => {
            let results = await this.studentRepository.save(student);
            return results;
        };
        this.searchStudentById = async (student) => {
            let results = await this.studentRepository.findOne({
                where: { id: student },
                relations: {
                    classRef: true
                }
            });
            return results;
        };
        this.searchStudentByName = async (name) => {
            let students = await this.studentRepository
                .createQueryBuilder("students")
                .where("students.name LIKE :name", { name: `%${name}%` })
                .getMany();
            return students;
        };
        this.updateStudent = async (pID, student) => {
            let studentEdited = await this.studentRepository.findOne({ where: { id: pID } });
            this.studentRepository.merge(studentEdited, student);
            let results = await this.studentRepository.save(studentEdited);
            return results;
        };
        this.deleteStudentById = async (student) => {
            let results = await this.studentRepository.delete(student);
            return results;
        };
        this.studentRepository = data_source_1.AppDataSource.getRepository(students_1.Students);
    }
}
exports.default = new StudentService();
//# sourceMappingURL=studentService.js.map