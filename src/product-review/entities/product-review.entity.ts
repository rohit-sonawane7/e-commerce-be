import { Product } from "src/product/entities/product.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('product_reviews')
export class ProductReview {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    product_id: string;

    @ManyToOne(() => Product, (product) => product.reviews, { onDelete: 'CASCADE' })
    product: Product;

    @Column({ nullable: true })
    user_id: string;

    @Column({ nullable: true })
    session_id: string;

    @Column('text')
    review_text: string;

    @Column({ type: 'int', nullable: true })
    rating: number;

    @CreateDateColumn()
    created_at: Date;
}
