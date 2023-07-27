import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Class } from "./class";

@Entity()
export class Students {

   @PrimaryGeneratedColumn()
   id: number;

   @Column()
   name: string;

   @Column()
   age: number;

   @Column()
   point: number;

   @ManyToOne(type => Class, cls => cls.id)
   classRef: Class[];
}
