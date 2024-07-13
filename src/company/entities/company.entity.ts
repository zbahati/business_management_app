import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";
import { AccountStatus } from "../enum/status.enum";

@Entity()
export class Company {
    @PrimaryGeneratedColumn()
    id: number
    
    @Column({unique: true})
    name: string

    @Column({unique: true})
    contact_email: string

    @Column()
    password: string

    @Column({type: 'enum', enum: AccountStatus, array: true, default: [AccountStatus.PENDING]})
    account_status: string

    @CreateDateColumn()
    created_at: Timestamp

    @UpdateDateColumn()
    updated_at: Timestamp
    
}
