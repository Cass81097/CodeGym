import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm"; 
import {Project} from "./project"; 

@Entity() 
export class Student {  
   
   @PrimaryGeneratedColumn() 
   id: number; 
   
   @Column() 
   name: string; 
   
   @OneToMany(type => Project, project => project.student) projects: Project[];  
}