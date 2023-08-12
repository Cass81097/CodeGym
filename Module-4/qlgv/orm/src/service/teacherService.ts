import {AppDataSource} from "../data-source";
import {Teacher} from "../entity/teacher";

class TeacherService{
    private repository;
    constructor() {
        this.repository = AppDataSource.getRepository(Teacher);
    }
    findAll = async () => {
        return await this.repository.find();
    }

    add = async (data) => {
        return await this.repository.save(data)
    }
    update = async (id, data) => {
        return await this.repository.update(id, data)
    }
    delete = async (id) => {
        return await this.repository.delete(id)
    }

    findByName = async (name) =>{
        return await this.repository.createQueryBuilder("teacher")
            .where("name LIKE :name",{ name: `%${name}%` })
            .getMany()
    }
    findByAgeRange = async (minAge, maxAge) => {
        return await this.repository.createQueryBuilder("teacher")
            .where("age >= :minAge", {minAge})
            .andWhere("age <= :maxAge", {maxAge})
            .getMany()
    }
    findBySalaryRange = async (minSalary, maxSalary) => {
        return await this.repository.createQueryBuilder("teacher")
            .where("salary >= :minSalary", {minSalary})
            .andWhere("salary <= :maxSalary", {maxSalary})
            .getMany()
    }
}
export default new TeacherService()