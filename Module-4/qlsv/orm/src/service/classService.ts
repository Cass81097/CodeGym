import { Class } from "../entity/class";
import { AppDataSource } from "../data-source";
import { Long } from "typeorm";

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

    deleteClassById = async (product: any) => {
        let results = await this.classRepository.delete(product)
        return results;
    }

    // deleteProductByName = async (productName) => {
    //     try {
    //         const product = await this.productRepository.findOne({ where: { name: productName } });
    //         if (!product) {
    //             return `Sản phẩm ${productName} không tồn tại.`;
    //         }

    //         await this.productRepository.remove(product);
    //         console.log('Xóa thành công!');
    //         return `Đã xóa sản phẩm ${productName}.`;
    //     } catch (error) {
    //         if (
    //             error.code === 'ER_ROW_IS_REFERENCED_2' ||
    //             error.code === 'ER_NO_REFERENCED_ROW'
    //         ) {
    //             return `Không thể xóa sản phẩm ${productName} vì đang có ràng buộc với dữ liệu khác trong cơ sở dữ liệu.`;
    //         }
    //         throw error;
    //     }
    // };

}

export default new ClassService();
