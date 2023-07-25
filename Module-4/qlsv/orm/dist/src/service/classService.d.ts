declare class ClassService {
    private classRepository;
    constructor();
    getAll: () => Promise<any>;
    saveClass: (product: any) => Promise<any>;
    searchClass: (classes: any) => Promise<any>;
    updateStudent: (cID: any, classes: any) => Promise<any>;
    deleteClassById: (product: any) => Promise<any>;
}
declare const _default: ClassService;
export default _default;
