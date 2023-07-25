declare class StudentService {
    private studentRepository;
    constructor();
    getAll: () => Promise<any>;
    searchStudentsByPointRange: (minPoint: number, maxPoint: number) => Promise<any>;
    getAllByASC: () => Promise<any>;
    getAllByDESC: () => Promise<any>;
    getAllStudentByClass: (classId: any) => Promise<any>;
    saveStudent: (student: any) => Promise<any>;
    searchStudentById: (student: any) => Promise<any>;
    searchStudentByName: (name: string) => Promise<any>;
    updateStudent: (pID: any, student: any) => Promise<any>;
    deleteStudentById: (student: any) => Promise<any>;
}
declare const _default: StudentService;
export default _default;
