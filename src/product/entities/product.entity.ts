import { Company } from "src/company/entities/company.entity";
import { Stockin } from "src/stockin/entities/stockin.entity";
import { Stockout } from "src/stockout/entities/stockout.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    name: string

    @Column({default: ' '})
    description: string

    @ManyToOne(()=> Company, (company) => company.products)
    company: Company

    @OneToMany(()=> Stockin, (stockin)=> stockin.product)
    stockin: Stockin[]

    @OneToMany(()=> Stockout, (stockout)=> stockout.product)
    stockout: Stockout[]
    
    @CreateDateColumn({type: "timestamptz"})
    created_at: Date

    @UpdateDateColumn({type: "timestamptz"})
    updated_at: Date

    constructor(entity: Partial<Product>){
        Object.assign(this, entity)
    }
}
