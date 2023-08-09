import { Students } from "../entity/students";
import { AppDataSource } from "../data-source";

class StudentService {
    private studentRepository: any;
    constructor() {
        this.studentRepository = AppDataSource.getRepository(Students);
    }

    getAll = async () => {
        let students = await this.studentRepository.findOne(
            {
            relations: {    
                classRef: true
            }
        });
        return students;
    }

    searchStudentsByPointRange = async (minPoint: number, maxPoint: number) => {
        let students = await this.studentRepository
            .createQueryBuilder("students")
            .where("students.point >= :minPoint", { minPoint })
            .andWhere("students.point <= :maxPoint", { maxPoint })
            .getMany();
        return students;
    }

    getAllByASC = async () => {
        let students = await this.studentRepository.find({
            relations: {
                classRef: true
            },
            order: {
                point: "ASC" 
            }
        });
        return students;
    }

    getAllByDESC = async () => {
        let students = await this.studentRepository.find({
            relations: {
                classRef: true
            },
            order: {
                point: "DESC" 
            }
        });
        return students;
    }

    getAllStudentByClass = async (classId: any) => {
        let students = await this.studentRepository
            .createQueryBuilder("students")
            .leftJoinAndSelect("students.classRef", "class")
            .select(["students.id", "students.name", "students.age", "students.point"])
            .where("class.id = :classId", { classId })
            .getMany();
        return students;
    }

    saveStudent = async (student: any) => {
        let results = await this.studentRepository.save(student)
        return results;
    }

    searchStudentById = async (student: any) => {
        let results = await this.studentRepository.findOne({ 
            where: { id: student },
            relations: {
                classRef: true
            }
        });
        return results;
    }

    searchStudentByName = async (name: string) => {
        let students = await this.studentRepository
            .createQueryBuilder("students")
            .where("students.name LIKE :name", { name: `%${name}%` })
            .getMany();
        return students;
    }

    updateStudent = async (pID: any, student: any) => {
        let studentEdited = await this.studentRepository.findOne({ where: { id: pID } });
        this.studentRepository.merge(studentEdited, student);
        let results = await this.studentRepository.save(studentEdited);
        return results;
    }

    deleteStudentById = async (student: any) => {
        let results = await this.studentRepository.delete(student)
        return results;
    }
}

export default new StudentService();
