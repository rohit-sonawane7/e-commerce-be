import { Controller, Post, Get, Param, Body, Req } from '@nestjs/common';
import { ProductReviewService } from './product-review.service';
import { CreateProductReviewDto } from './dto/create-product-review.dto';

@Controller('reviews')
export class ProductReviewController {
  constructor(private readonly reviewService: ProductReviewService) { }

  @Post(':productId')
  addReview(@Param('productId') productId: string, @Body() body: CreateProductReviewDto, @Req() req) {
    const userId = req.user?.id;
    return this.reviewService.addReview(productId, body, userId);
  }

  @Get(':productId')
  getReviews(@Param('productId') productId: string) {
    return this.reviewService.getReviews(productId);
  }
}
