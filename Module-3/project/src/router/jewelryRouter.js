import jewelryController from '../controller/jewelryController.js'

let jewelryRouter = {
    '/jewelry/add': jewelryController.showFormAdd,

    '/jewelry/edit': jewelryController.showFormEdit,
        
    '/jewelry/delete': jewelryController.delete,

    // '/jewelry/search': jewelryController.search,

    '/jewelry/sort': jewelryController.sortById,

    '/jewelry/reSort': jewelryController.reSortById,

}

export default jewelryRouter;
