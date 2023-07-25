import { Request, Response } from "express";
declare class studentController {
    findAll: (req: Request, res: Response) => Promise<void>;
    searchStudent: (req: Request, res: Response) => Promise<void>;
    findAllStudentByClass: (req: Request, res: Response) => Promise<void>;
    addStudent: (req: Request, res: Response) => Promise<void>;
    updateStudent: (req: Request, res: Response) => Promise<void>;
    deleteStudentById: (req: Request, res: Response) => Promise<void>;
}
declare const _default: studentController;
export default _default;
