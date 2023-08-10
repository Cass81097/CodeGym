"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Car_1 = require("../entity/Car");
const data_source_1 = require("../data-source");
class CarService {
    constructor() {
        this.getAll = async () => {
            const cars = await this.carRepository.find({
                relations: ["brandInfo"],
            });
            return cars;
        };
        this.getAllByID = async (car) => {
            const cars = await this.carRepository.findOne({
                where: { id: car },
                relations: ["brandInfo"]
            });
            return cars;
        };
        this.saveCar = async (product) => {
            let results = await this.carRepository.save(product);
            return results;
        };
        this.searchCar = async (cars) => {
            let results = await this.carRepository.findOne({
                where: { id: cars },
                relations: ["brandInfo"]
            });
            return results;
        };
        this.updateCar = async (cID, cars) => {
            let CarEdited = await this.carRepository.findOne({
                where: { id: cID },
                relations: ["brandInfo"]
            });
            this.carRepository.merge(CarEdited, cars);
            let results = await this.carRepository.save(CarEdited);
            return results;
        };
        this.deleteCarById = async (cars) => {
            let results = await this.carRepository.delete(cars);
            return results;
        };
        this.getAllByASC = async () => {
            const cars = await this.carRepository.find({
                relations: ["brandInfo"],
                order: {
                    price: "ASC",
                },
            });
            return cars;
        };
        this.getAllByDESC = async () => {
            const cars = await this.carRepository.find({
                relations: ["brandInfo"],
                order: {
                    price: "DESC",
                },
            });
            return cars;
        };
        this.carRepository = data_source_1.AppDataSource.getRepository(Car_1.Car);
    }
}
exports.default = new CarService();
//# sourceMappingURL=carService.js.map