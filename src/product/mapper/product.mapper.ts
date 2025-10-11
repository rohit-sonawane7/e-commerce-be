// product.mapper.ts
import { Product } from '../entities/product.entity';
import { ProductResponseDto, ProductResponseWithPaginationDto } from '../dto/product-response.dto';
import { PaginatedResult } from 'src/common/utils/pagination.util';
import { CreateProductDto } from '../dto/create-product.dto';

export class ProductMapper {
  static productMapper(product: Product, rating?: number, reviewCount?: number): ProductResponseDto {
    return {
      id: product.id,
      title: product.title,
      brand: product.brand,
      description: product.description,
      price: +product.price,
      originalPrice: product.original_price ? +product.original_price : undefined,
      discount: product.discount ? +product.discount : undefined,
      image: product.image,
      images: product.images,
      category: product.category,
      subcategory: product.subcategory,
      inStock: product.in_stock,
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

  static toProductMapper(product: CreateProductDto): Partial<Product> {
    return {
      title: product.title,
      brand: product.brand,
      description: product.description,
      price: +product.price,
      original_price: product.originalPrice ? +product.originalPrice : undefined,
      discount: product.discount ? +product.discount : undefined,
      image: product.image,
      images: product.images,
      category: product.category,
      subcategory: product.subcategory,
      in_stock: product.inStock,
      sizes: product.sizes,
      colors: product.colors,
      featured: product.featured,
      tags: product.tags,
      created_at: new Date(),
      updated_at: new Date()
    };
  }

}
