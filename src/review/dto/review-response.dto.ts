// dto/review-response.dto.ts
export class ReviewResponseDto {
  id: string;
  rating: number;
  comment?: string;
  userId: string;
  createdAt: Date;
}
