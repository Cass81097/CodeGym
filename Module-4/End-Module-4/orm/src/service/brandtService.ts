import { Brand } from "../entity/Brand";
import { AppDataSource } from "../data-source";

class BrandService {
    private brandRepository: any;
    constructor() {
        this.brandRepository = AppDataSource.getRepository(Brand);
    }

    getAll = async () => {
        let brands = await this.brandRepository.find();
        return brands;
    }

}

export default new BrandService();
