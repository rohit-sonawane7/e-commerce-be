import { IsNumber, IsString, IsUUID } from "class-validator";

export class CreateProductReviewDto {
    @IsString()
    reviewText: string;

    @IsNumber()
    rating: number;

    @IsUUID()
    sessionId: string;
}
