declare class TeacherService {
    private repository;
    constructor();
    findAll: () => Promise<any>;
    add: (data: any) => Promise<any>;
    update: (id: any, data: any) => Promise<any>;
    delete: (id: any) => Promise<any>;
    findByName: (name: any) => Promise<any>;
    findByAgeRange: (minAge: any, maxAge: any) => Promise<any>;
    findBySalaryRange: (minSalary: any, maxSalary: any) => Promise<any>;
}
declare const _default: TeacherService;
export default _default;
