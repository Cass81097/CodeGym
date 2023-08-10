declare class CarService {
    private carRepository;
    constructor();
    getAll: () => Promise<any>;
    getAllByID: (car: any) => Promise<any>;
    saveCar: (product: any) => Promise<any>;
    searchCar: (cars: any) => Promise<any>;
    updateCar: (cID: any, cars: any) => Promise<any>;
    deleteCarById: (cars: any) => Promise<any>;
    getAllByASC: () => Promise<any>;
    getAllByDESC: () => Promise<any>;
}
declare const _default: CarService;
export default _default;
