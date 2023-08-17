import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./User";

@Entity()
export class ProductPro {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({type: 'varchar', length: 255})
    title: string;
    @Column()
    price: number;
    @Column({type: 'varchar', length: 255})
    description: string;
    
    @ManyToOne(() => User, (user) => user.id)
    user: User
}

