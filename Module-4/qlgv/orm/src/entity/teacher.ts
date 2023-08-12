import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Teacher {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({type: 'varchar', length: 255, nullable: true})
    name: string;
    @Column({type:'int',  nullable: true})
    age: number;
    @Column({type: 'int', nullable: true})
    salary: string;
}
