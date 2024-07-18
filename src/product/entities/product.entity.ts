import { Company } from "src/company/entities/company.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    name: string

    @Column({default: ' '})
    description: string

    @Column()
    price: number

    @ManyToOne(()=> Company, (company) => company.products)
    company: Company
    
    @CreateDateColumn({type: "timestamptz"})
    created_at: Date

    @UpdateDateColumn({type: "timestamptz"})
    updated_at: Date

    constructor(entity: Partial<Product>){
        Object.assign(this, entity)
    }
}
