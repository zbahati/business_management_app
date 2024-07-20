import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";
import { AccountStatus } from "../enum/status.enum";
import { Subscription } from "src/subscription/entities/subscription.entity";
import { Product } from "src/product/entities/product.entity";
import { Stockin } from "src/stockin/entities/stockin.entity";
import { Stockout } from "src/stockout/entities/stockout.entity";

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

    @Column({type: 'enum', enum: AccountStatus, default: AccountStatus.PENDING})
    account_status:AccountStatus

    @CreateDateColumn()
    created_at: Timestamp

    @UpdateDateColumn()
    updated_at: Timestamp

    @OneToMany(()=>Subscription, (sub)=> sub.company)
    subscriptions: Subscription[]

    @OneToMany(()=> Product, (product)=> product.company)
    products: Product[]

    @OneToMany(()=> Stockin, (stockin)=> stockin.company)
    stockin: Stockin[]

    @OneToMany(()=> Stockout, (stockout)=> stockout.company)
    stockout: Stockout[]

    constructor(entity: Partial<Company>){
        Object.assign(this, entity)
    }
    
}
