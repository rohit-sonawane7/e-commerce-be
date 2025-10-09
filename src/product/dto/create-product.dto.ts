// dto/create-product.dto.ts
import { IsString, IsNumber, IsOptional, IsBoolean, IsArray } from 'class-validator';

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

  @IsString()
  category: string;

  @IsOptional()
  @IsString()
  subcategory?: string;

  @IsBoolean()
  inStock: boolean;

  @IsOptional()
  @IsArray()
  sizes?: string[];

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
