import { Product } from "src/product/entities/product.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('product_reactions')
export class ProductReaction {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    productId: string;

    @Column({ nullable: true })
    userId: string;

    @Column({ nullable: true })
    sessionId: string;

    @ManyToOne(() => Product, (product) => product.reactions, { onDelete: 'CASCADE' })
    product: Product;

    @Column({ type: 'enum', enum: ['like', 'dislike'] })
    type: 'like' | 'dislike';

    @CreateDateColumn()
    createdAt: Date;
}
