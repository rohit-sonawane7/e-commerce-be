import { IsOptional, IsInt, Min, IsBoolean, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { ProductCategory } from '../entities/product.entity';

export class GetProductQueryDto {
    @IsOptional()
    @IsEnum(ProductCategory, {
        message: `status must be one of: ${Object.values(ProductCategory).join(', ')}`,
    })
    category?: ProductCategory;

    @IsOptional()
    @IsBoolean()
    @Type(() => Boolean)
    featured: boolean = false;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page?: number = 1;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    limit?: number = 10;
}
