import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    UpdateDateColumn,
    CreateDateColumn,
} from 'typeorm';
import { Review } from '../../review/entities/review.entity';
import { ProductReaction } from 'src/product-reaction/entities/product-reaction.entity';
import { ProductReview } from 'src/product-review/entities/product-review.entity';


export enum ProductCategory {
    MEN = 'men',
    WOMEN = 'women',
    KIDS = 'kids',
    ACCESSORIES = 'accessories'
}

@Entity()
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    brand: string;

    @Column({ type: 'text' })
    description: string;

    @Column('decimal')
    price: number;

    @Column('decimal', { nullable: true })
    original_price?: number;

    @Column('decimal', { nullable: true, comment: "discount is in percentage" })
    discount?: number;

    @Column('text', { nullable: true })
    image: string;

    @Column('text', { array: true, nullable: true })
    images?: string[];

    @Column({
        type: 'enum',
        enum: ProductCategory,
        default: ProductCategory.ACCESSORIES,
    }) category: ProductCategory;

    @Column({ nullable: true })
    subcategory?: string;

    @Column({ default: true })
    in_stock: boolean;

    @Column('text', { array: true, nullable: true })
    sizes?: string[];

    @Column('text', { array: true, nullable: true })
    colors?: string[];

    @Column({ default: false })
    featured?: boolean;

    @Column('text', { array: true, nullable: true })
    tags?: string[];

    @OneToMany(() => Review, (review) => review.product)
    reviews: Review[];

    @Column({ default: 0 })
    like_count: number;

    @Column({ default: 0 })
    dislike_count: number;

    @OneToMany(() => ProductReaction, (reaction) => reaction.product)
    reactions: ProductReaction[];

    @OneToMany(() => ProductReview, (product_review) => product_review.product)
    product_review: ProductReview[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
