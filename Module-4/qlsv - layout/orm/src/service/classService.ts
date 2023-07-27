import { Class } from "../entity/class";
import { AppDataSource } from "../data-source";

class ClassService {
    private classRepository : any;
    constructor() {
        this.classRepository = AppDataSource.getRepository(Class);
    }

    getAll = async () => {
        let classes = await this.classRepository.find();
        return classes;
    }

    saveClass = async (product: any) => {
        let results = await this.classRepository.save(product)
        return results;
    }

    searchClass = async (classes: any) => {
        let results = await this.classRepository.findOne({ where: { id: classes } });
        return results;
    }

    updateStudent = async (cID: any, classes: any) => {
        let classEdited = await this.classRepository.findOne({ where: { id: cID } });
        this.classRepository.merge(classEdited, classes);
        let results = await this.classRepository.save(classEdited);
        return results;
    }

    deleteClassById = async (classes: any) => {
        let results = await this.classRepository.delete(classes)
        return results;
    }

}

export default new ClassService();
