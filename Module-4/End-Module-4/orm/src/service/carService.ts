import { Car } from "../entity/Car";
import { AppDataSource } from "../data-source";

class CarService {
    private carRepository: any;
    constructor() {
        this.carRepository = AppDataSource.getRepository(Car);
    }

    getAll = async () => {
        const cars = await this.carRepository.find({
            relations: ["brandInfo"],
        });

        return cars;
    }

    getAllByID = async (car: any) => {
        const cars = await this.carRepository.findOne({
            where: { id: car },
            relations: ["brandInfo"]
        })

        return cars;
    }

    saveCar = async (product: any) => {
        let results = await this.carRepository.save(product)
        return results;
    }

    searchCar = async (cars: any) => {
        let results = await this.carRepository.findOne({
            where: { id: cars },
            relations: ["brandInfo"]
        });
        return results;
    }

    updateCar = async (cID: any, cars: any) => {
        let CarEdited = await this.carRepository.findOne({
            where: { id: cID },
            relations: ["brandInfo"]
        });
        this.carRepository.merge(CarEdited, cars);
        let results = await this.carRepository.save(CarEdited);
        return results;
    }

    deleteCarById = async (cars: any) => {
        let results = await this.carRepository.delete(cars)
        return results;
    }

    getAllByASC = async () => {
        const cars = await this.carRepository.find({
            relations: ["brandInfo"],
            order: {
                price: "ASC",
            },
        });
        return cars;
    };

    getAllByDESC = async () => {
        const cars = await this.carRepository.find({
            relations: ["brandInfo"],
            order: {
                price: "DESC",
            },
        });
        return cars;
    };

}

export default new CarService();
