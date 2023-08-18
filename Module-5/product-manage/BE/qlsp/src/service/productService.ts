import { ProductPro } from "../entity/Product";
import { AppDataSource } from "../data-source";
class ProductService {
    private productRepository;
    constructor() {

        this.productRepository = AppDataSource.getRepository(ProductPro)
    }

    getAll = async () => {
        let show = await this.productRepository
            .find({
                relations: ["user"]
            });
        return show;
    }

    // findAllFor2 = async ( name: string, id: number) => {
    //     return await this.productRepository.createQueryBuilder('ProductPro')
    //         .leftJoinAndSelect('ProductPro.Studen', 'Studen')
    //         .where('ProductPro.name = :name', { name })
    //         .andWhere('ProductPro.id = :id', { id })
    //         .getMany();
    // };

    findByID = async (id) => {
        return await this.productRepository.find({
            where: { id: id },
            relations: ["user"]
        })
    }

    add = async (product) => {
        await this.productRepository.save(product)
    }


    updateProduct = async (pID: any, product: any) => {
        let productEdited = await this.productRepository.findOne({ where: { id: pID } });
        this.productRepository.merge(productEdited, product);
        let results = await this.productRepository.save(productEdited);
        return results;
    }

    delete = async (id) => {
        await this.productRepository.createQueryBuilder()
            .delete()
            .from(ProductPro)
            .where("id = :id", { id: id })
            .execute();
    }

}

export default new ProductService();
