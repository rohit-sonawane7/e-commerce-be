import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { ProductMapper } from './mapper/product.mapper';
import { UserRole } from 'src/user/entities/user.entity';
import { GetProductQueryDto } from './dto/get-product-query-params-dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Get()
  async findAll(@Query() query: GetProductQueryDto) {
    const skip = query.page;
    const take = query.limit;

    delete query.page;
    delete query.limit;
    const products = await this.productService.findAll(query, skip, take);
    return ProductMapper.toResponse(products);
  }

  // 🔹 Public - Get one product
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const product = await this.productService.findOne(id);
    const avg =
      product.reviews?.reduce((sum, r) => sum + r.rating, 0) /
      (product.reviews?.length || 1);
    return ProductMapper.productMapper(product, avg, product.reviews?.length || 0);
  }

  // 🔹 Admin only - Create product
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async create(@Body() dto: CreateProductDto) {
    const product = await this.productService.create(dto);
    return ProductMapper.productMapper(product, 0, 0);
  }

  // 🔹 Admin only - Delete product
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async remove(@Param('id') id: string) {
    await this.productService.remove(id);
    return { message: 'Product deleted successfully' };
  }
}
