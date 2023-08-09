import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity() 
export class Class {
   @PrimaryGeneratedColumn() 
   id: number; 
   
   @Column() 
   name: string; 
   
   @Column() 
   teacherName: string; 
   
   @Column() 
   totalStudent: number; 
}