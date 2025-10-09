import { Module } from '@nestjs/common';
import { CloudinaryProvider } from './cloudinary.config';
import { CloudinaryController } from './cloudinary.controller';
import { CloudinaryService } from './cloudinary.service';
import { ProductService } from 'src/product/product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/product/entities/product.entity';
import { Review } from 'src/review/entities/review.entity';
import { ProductReaction } from 'src/product-reaction/entities/product-reaction.entity';
import { ProductReview } from 'src/product-review/entities/product-review.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Review, ProductReaction, ProductReview])],
  controllers: [CloudinaryController],
  providers: [CloudinaryProvider, CloudinaryService, ProductService],
  exports: [CloudinaryProvider, CloudinaryService],
})
export class CloudinaryModule { }
