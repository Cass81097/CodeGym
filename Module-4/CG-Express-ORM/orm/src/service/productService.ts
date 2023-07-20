import { ProductPro } from "../entity/product";
import { AppDataSource } from "../data-source";
import { Long } from "typeorm";

class ProductService {
    private productRepository : any;
    constructor() {
        this.productRepository = AppDataSource.getRepository(ProductPro);
    }

    getAll = async () => {
        let products = await this.productRepository.find();
        return products;
    }

    save = async (product: any) => {
        let results = await this.productRepository.save(product)
        return results;
    }

    search = async (product: any) => {
        let results = await this.productRepository.findOne({ where: { id: product } });
        return results;
    }

    updateProduct = async (pID: any, product: any) => {
        let productEdited = await this.productRepository.findOne({ where: { id: pID } });
        this.productRepository.merge(productEdited, product);
        let results = await this.productRepository.save(productEdited);
        return results;
    }

    deleteProductById = async (product) => {
        let results = await this.productRepository.delete(product)
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

export default new ProductService();
