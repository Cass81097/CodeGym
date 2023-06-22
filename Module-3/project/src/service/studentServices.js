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

    findStudentById(id) {
        for (const student of this.listStudent) {
            if (student.id == id) {
                return student;
            }
        }
    } 

    save(student) {
        let checkExist = false; 
        for (let i = 0; i < this.listStudent.length; i++) {
            if (this.listStudent[i].id == student.id) {
                this.listStudent[i] = student;
                checkExist = true;
            }
        }
        if (!checkExist) {
            this.listStudent.push(student);
        }
    }
    
    sortByID() {
        let sortedID = this.listStudent.sort((a, b) => b.id - a.id);
        return sortedID; 
    }

    reSortByID() {
        let sortedID = this.listStudent.sort((a, b) => a.id - b.id);
        return sortedID; 
    }
}

