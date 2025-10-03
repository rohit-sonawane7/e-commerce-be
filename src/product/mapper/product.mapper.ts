// product.mapper.ts
import { Product } from '../entities/product.entity';
import { ProductResponseDto, ProductResponseWithPaginationDto } from '../dto/product-response.dto';
import { PaginatedResult } from 'src/common/utils/pagination.util';

export class ProductMapper {
  static productMapper(product: Product, rating?: number, reviewCount?: number): ProductResponseDto {
    return {
      id: product.id,
      title: product.title,
      brand: product.brand,
      description: product.description,
      price: +product.price,
      originalPrice: product.originalPrice ? +product.originalPrice : undefined,
      discount: product.discount ? +product.discount : undefined,
      image: product.image,
      images: product.images,
      category: product.category,
      subcategory: product.subcategory,
      inStock: product.inStock,
      sizes: product.sizes,
      colors: product.colors,
      featured: product.featured,
      tags: product.tags,
      rating: rating || 0,
      reviewCount: reviewCount || 0,
    };
  }

  static toResponse(data: PaginatedResult<Product>): ProductResponseWithPaginationDto {
    return {
      products: data.data.map((product) => this.productMapper(product)),
      page: data.meta.skip,
      total: data.meta.total,
      totalPages: data.meta.last_page
    }
  }
}
