declare class UserService {
    private userRepository;
    constructor();
    register: (user: any) => Promise<any>;
    checkUser: (user: any) => Promise<string>;
}
declare const _default: UserService;
export default _default;
