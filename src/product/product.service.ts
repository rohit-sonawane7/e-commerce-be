import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';
import { GetProductQueryDto } from './dto/get-product-query-params-dto';
import { buildPagination, PaginatedResult } from 'src/common/utils/pagination.util';
import { ProductMapper } from './mapper/product.mapper';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
  ) { }

  async create(dto: CreateProductDto): Promise<Product> {
    const product = ProductMapper.toProductMapper(dto);
    const mappedProduct = this.productRepo.create(product);
    return this.productRepo.save(mappedProduct);
  }

  async findAll(query: GetProductQueryDto, skip?: number, take?: number): Promise<PaginatedResult<Product>> {
    if (!skip) skip = 1;
    if (!take) take = 10;

    const [data, total] = await this.productRepo.findAndCount(
      {
        where: { ...query },
        relations: ['reviews'],
        skip,
        take,
        order: { created_at: 'DESC' }
      });

    return buildPagination(data, total, { skip, take });

  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productRepo.findOne({
      where: { id },
      relations: ['reviews'],
    });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async remove(id: string): Promise<void> {
    const result = await this.productRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException('Product not found');
  }

  async update(id: string, product: UpdateProductDto) {
    await this.productRepo.update(id, { ...product });
    return this.findOne(id);
  }
}
