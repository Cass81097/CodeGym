import studentController from '../controller/studentController.js'

let studentRouter = {
    '/student': studentController.showListStudent,

    '/student/add': studentController.showFormAdd,

    '/student/edit': studentController.showFormEdit,
        
    '/student/delete': studentController.delete,

    '/student/search': studentController.search,

    '/student/sort': studentController.sortById,

    '/student/reSort': studentController.reSortById,

}

export default studentRouter;
