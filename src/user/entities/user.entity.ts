import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";
import { Roles } from "../enum/roles.enum";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string
    
    @Column()
    email: string

    @Column()
    password: string

    @Column({type: 'enum', enum: Roles, array: true, default: [Roles.ADMIN]})
    role: string

    @CreateDateColumn()
    created_at: Timestamp

    @UpdateDateColumn()
    updated_at: Timestamp
}
