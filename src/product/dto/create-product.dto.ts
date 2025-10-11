// dto/create-product.dto.ts
import { IsString, IsNumber, IsOptional, IsBoolean, IsArray, IsEnum } from 'class-validator';
import { ProductCategory } from '../entities/product.entity';

export class CreateProductDto {
  @IsString()
  title: string;

  @IsString()
  brand: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsOptional()
  @IsNumber()
  originalPrice?: number;

  @IsOptional()
  @IsNumber()
  discount?: number;

  @IsEnum(ProductCategory, {
    message: `status must be one of: ${Object.values(ProductCategory).join(', ')}`,
  })
  category?: ProductCategory;

  @IsOptional()
  @IsString()
  subcategory?: string;

  @IsBoolean()
  inStock: boolean;

  @IsOptional()
  @IsArray()
  sizes?: string[];

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsArray()
  images?: string[];

  @IsOptional()
  @IsArray()
  colors?: string[];

  @IsOptional()
  @IsBoolean()
  featured?: boolean;

  @IsOptional()
  @IsArray()
  tags?: string[];

  @IsOptional()
  @IsNumber()
  rating?: number;
}
