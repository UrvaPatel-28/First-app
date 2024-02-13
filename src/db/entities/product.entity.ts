import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserRole } from "src/user/roles.enum";
import { Task } from "./task.entity";

@Entity()
export class Product {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar' })
    title: string;

    @Column({ type: 'varchar' })
    description: string;

    @Column({ type: 'varchar' })
    category: string;

    @Column({ type: "varchar" })
    price: number;

    @Column({ type: 'varchar' })
    image: string;

}



