// product.entity.ts
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
} from 'typeorm';
import { Review } from '../../review/entities/review.entity';

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

    // reviews relationship
    @OneToMany(() => Review, (review) => review.product)
    reviews: Review[];
}
