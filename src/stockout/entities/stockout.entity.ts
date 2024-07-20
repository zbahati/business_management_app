import { Company } from "src/company/entities/company.entity";
import { Product } from "src/product/entities/product.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Stockout {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    quantity: number

    @Column()
    price: number

    @Column({default: 0})
    total_price: number
    
    @ManyToOne(()=> Product, (prod)=> prod.stockout)
    product: Product

    @ManyToOne(()=> Company, (company)=> company.stockout)
    company: Company

    @CreateDateColumn({type: 'timestamptz'})
    created_at: Date

    @UpdateDateColumn({type: 'timestamptz'})
    updated_at: Date

    constructor(entity: Partial<Stockout>){
        Object.assign(this, entity)
    }
}
