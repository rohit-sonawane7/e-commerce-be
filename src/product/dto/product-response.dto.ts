// dto/product-response.dto.ts
export class ProductResponseDto {
  id: string;
  title: string;
  brand: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  images?: string[];
  category: string;
  subcategory?: string;
  inStock: boolean;
  sizes?: string[];
  colors?: string[];
  featured?: boolean;
  tags?: string[];
  rating: number;
  reviewCount: number;
}

export class ProductResponseWithPaginationDto {
  products: ProductResponseDto[];
  total: number;
  page: number;
  totalPages: number;
}