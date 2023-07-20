import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity() 
export class Details {
   @PrimaryGeneratedColumn() 
   id: number; 
   
   @Column() 
   gender: string; 
   
   @Column() 
   country: string; 
}