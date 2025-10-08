import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
} from 'typeorm';
import { Review } from '../../review/entities/review.entity';
import { ProductReaction } from 'src/product-reaction/entities/product-reaction.entity';

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
    originalPrice?: number;

    @Column('decimal', { nullable: true })
    discount?: number;

    @Column()
    image: string;

    @Column('text', { array: true, nullable: true })
    images?: string[];

    @Column()
    category: string;

    @Column({ nullable: true })
    subcategory?: string;

    @Column({ default: true })
    inStock: boolean;

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
    likeCount: number;

    @Column({ default: 0 })
    dislikeCount: number;

    @OneToMany(() => ProductReaction, (reaction) => reaction.product)
    reactions: ProductReaction[];
}
