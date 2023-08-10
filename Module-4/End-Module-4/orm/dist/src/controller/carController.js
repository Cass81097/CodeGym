"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const carService_1 = __importDefault(require("../service/carService"));
class carController {
    constructor() {
        this.findAll = async (req, res) => {
            let { asc, desc } = req.query;
            if (asc === undefined && desc === undefined) {
                let listCar = await carService_1.default.getAll();
                res.json(listCar);
            }
            else if (asc !== undefined && desc === undefined) {
                let listCar = await carService_1.default.getAllByDESC();
                res.json(listCar);
            }
            else if (asc == undefined && desc !== undefined) {
                let listCar = await carService_1.default.getAllByASC();
                res.json(listCar);
            }
        };
        this.findAllByID = async (req, res) => {
            let listCar = await carService_1.default.getAllByID(req.params.id);
            res.json(listCar);
        };
        this.addCar = async (req, res) => {
            let results = await carService_1.default.saveCar(req.body);
            console.log(req.body);
            res.json(results);
        };
        this.searchCarById = async (req, res) => {
            let results = await carService_1.default.searchCar(req.params.id);
            res.json(results);
        };
        this.deleteCarById = async (req, res) => {
            await carService_1.default.deleteCarById(req.params.id);
            res.json('Xóa thành công!');
        };
        this.updateCar = async (req, res) => {
            try {
                let indexCar = await carService_1.default.searchCar(req.params.id);
                let cID = req.params.id;
                let Cares = req.body;
                let results = await carService_1.default.updateCar(cID, Cares);
                if (indexCar.name !== results.name ||
                    indexCar.brandName !== results.brandName ||
                    indexCar.totalCar !== results.totalStudent) {
                    res.json('Sửa thành công');
                }
                else {
                    res.json(results);
                }
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ error: 'Error!' });
            }
        };
    }
}
exports.default = new carController();
//# sourceMappingURL=carController.js.map