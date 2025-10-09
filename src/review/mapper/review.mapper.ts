import { ReviewResponseDto } from "../dto/review-response.dto";
import { Review } from "../entities/review.entity";

export class ReviewMapper {
  static toResponse(review: Review): ReviewResponseDto {
    return {
      id: review.id,
      rating: review.rating,
      comment: review.comment,
      userId: review.user?.id,
      createdAt: review.created_at,
    };
  }
}
