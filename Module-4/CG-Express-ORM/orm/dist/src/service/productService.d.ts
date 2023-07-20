declare class ProductService {
    private productRepository;
    constructor();
    getAll: () => Promise<any>;
    save: (product: any) => Promise<any>;
    search: (product: any) => Promise<any>;
    updateProduct: (pID: any, product: any) => Promise<any>;
    deleteProductById: (product: any) => Promise<any>;
}
declare const _default: ProductService;
export default _default;
