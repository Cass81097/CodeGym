import { Student } from "../model/student.js"

export class StudentServices {

    constructor() {
        this.listStudent = [];
        this.listStudent.push(new Student(1, 'Hoang Anh', 9),
                              new Student(2, 'Quynh', 7),
                              new Student(3, 'Tran Anh', 8))
    }

    findAll() {
        return this.listStudent;
    }

    addStudent(student) {
        this.listStudent.push(student);
    }

    findStudentByName(search) {
        let studentSearched = this.listStudent.filter(item => item.name.toLowerCase().includes(search.toLowerCase())|| item.name.includes(search));
        return studentSearched;
    }

    deleteStudent(id) {
        this.listStudent = this.listStudent.filter(student => student.id != id);
        return this.listStudent;
    }
}

