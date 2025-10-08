import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductReview } from './entities/product-review.entity';
import { CreateProductReviewDto } from './dto/create-product-review.dto';

@Injectable()
export class ProductReviewService {
  constructor(
    @InjectRepository(ProductReview)
    private reviewRepo: Repository<ProductReview>,
  ) { }

  async addReview(productId: string, productReview: CreateProductReviewDto, userId?: string) {
    const review = this.reviewRepo.create({
      productId,
      reviewText: productReview.reviewText,
      rating: productReview.rating,
      sessionId: productReview.sessionId,
      userId: userId,
      createdAt: new Date()
    });
    return this.reviewRepo.save(review);
  }

  async getReviews(productId: string) {
    return this.reviewRepo.find({
      where: { productId },
      order: { createdAt: 'DESC' },
    });
  }

  async mergeGuestData(userId: string, sessionId: string) {
    await this.reviewRepo.update(sessionId, { userId, sessionId: undefined });
  }
}
