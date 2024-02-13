import { timeStamp } from "console";
import { BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Task {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    title: string

    @Column()
    description: string

    @CreateDateColumn({ type: "timestamp with time zone" })
    date: Date;

    @ManyToOne(() => User, (user) => user.tasks)
    @JoinColumn({ name: 'user_id' })
    user: User;

    //another way
    // @Column({ type: "timestamp with time zone", default: () => "CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Kolkata'" })
    // date: Date;

    //this also but it's not working
    // @BeforeInsert()
    // setDate() {
    //     console.log('set date is called');

    //     this.date = new Date()
    // }//


}