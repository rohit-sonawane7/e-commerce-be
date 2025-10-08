import {
    Controller,
    Post,
    Get,
    Body,
    Param,
    UseGuards,
    Req,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ReviewMapper } from './mapper/review.mapper';

@Controller('reviews')
export class ReviewController {
    constructor(private readonly reviewService: ReviewService) { }

    @Post()
    @UseGuards(JwtAuthGuard)
    async create(@Body() dto: CreateReviewDto, @Req() req) {
        const review = await this.reviewService.create(dto, req.user.id);
        return ReviewMapper.toResponse(review);
    }

    // 🔹 Public - get reviews for product
    @Get('/product/:productId')
    async findByProduct(@Param('productId') productId: string) {
        const reviews = await this.reviewService.findByProduct(productId);
        return reviews.map((r) => ReviewMapper.toResponse(r));
    }
}
