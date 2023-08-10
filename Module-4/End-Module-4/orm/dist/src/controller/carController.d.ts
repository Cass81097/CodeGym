import { Request, Response } from "express";
declare class carController {
    findAll: (req: Request, res: Response) => Promise<void>;
    findAllByID: (req: Request, res: Response) => Promise<void>;
    addCar: (req: Request, res: Response) => Promise<void>;
    searchCarById: (req: Request, res: Response) => Promise<void>;
    deleteCarById: (req: Request, res: Response) => Promise<void>;
    updateCar: (req: Request, res: Response) => Promise<void>;
}
declare const _default: carController;
export default _default;
