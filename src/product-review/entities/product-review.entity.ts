import { Product } from "src/product/entities/product.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('product_reviews')
export class ProductReview {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    productId: string;

    @ManyToOne(() => Product, (product) => product.reviews, { onDelete: 'CASCADE' })
    product: Product;

    @Column({ nullable: true })
    userId: string;

    @Column({ nullable: true })
    sessionId: string;

    @Column('text')
    reviewText: string;

    @Column({ type: 'int', nullable: true })
    rating: number;

    @CreateDateColumn()
    createdAt: Date;
}
