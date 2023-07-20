import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"; 
import { Student } from "./students";

@Entity()
export class Project {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    projects: string;

    @ManyToOne(type => Student, student => student.projects) student: Student;
}