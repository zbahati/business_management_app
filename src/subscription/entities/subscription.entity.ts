
import { Company } from "src/company/entities/company.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";

@Entity()
export class Subscription {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    amount: number

    @Column({default: 5000})
    sub_amount: number

    @CreateDateColumn({type: 'timestamptz'})
    created_at: Date

    @UpdateDateColumn({type: 'timestamptz'})
    updated_at: Date

    @ManyToOne(()=> Company, (company) => company.subscriptions)
    company: Company

    constructor(entity: Partial<Subscription>){
        Object.assign(this, entity)
    }

}
