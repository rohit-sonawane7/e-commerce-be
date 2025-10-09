import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Product } from './entities/product.entity';
import { Review } from 'src/review/entities/review.entity';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { User } from 'src/user/entities/user.entity';
import { ProductReaction } from 'src/product-reaction/entities/product-reaction.entity';
import { ProductReview } from 'src/product-review/entities/product-review.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Review, User, ProductReaction, ProductReview]), CloudinaryModule],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule { }
