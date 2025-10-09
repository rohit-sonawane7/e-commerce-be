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
      product_id: productId,
      review_text: productReview.reviewText,
      rating: productReview.rating,
      session_id: productReview.sessionId,
      user_id: userId,
      created_at: new Date()
    });
    return this.reviewRepo.save(review);
  }

  async getReviews(productId: string) {
    return this.reviewRepo.find({
      where: { product_id: productId },
      order: { created_at: 'DESC' },
    });
  }

  async mergeGuestData(userId: string, sessionId: string) {
    await this.reviewRepo.update(sessionId, { user_id: userId, session_id: undefined });
  }
}
