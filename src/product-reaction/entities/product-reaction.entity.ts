import { Product } from "src/product/entities/product.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('product_reactions')
export class ProductReaction {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    product_id: string;

    @Column({ nullable: true })
    user_id: string;

    @Column({ nullable: true })
    session_id: string;

    @ManyToOne(() => Product, (product) => product.reactions, { onDelete: 'CASCADE' })
    product: Product;

    @Column({ type: 'enum', enum: ['like', 'dislike'] })
    type: 'like' | 'dislike';

    @CreateDateColumn()
    created_at: Date;
}
