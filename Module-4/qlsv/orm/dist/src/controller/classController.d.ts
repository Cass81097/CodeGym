import { Request, Response } from "express";
declare class classController {
    findAll: (req: Request, res: Response) => Promise<void>;
    addClass: (req: Request, res: Response) => Promise<void>;
    searchClassById: (req: Request, res: Response) => Promise<void>;
    deleteClassById: (req: Request, res: Response) => Promise<void>;
    updateClass: (req: Request, res: Response) => Promise<void>;
}
declare const _default: classController;
export default _default;
