import { PartialType } from '@nestjs/mapped-types';
import { CreateProductReactionDto } from './create-product-reaction.dto';

export class UpdateProductReactionDto extends PartialType(CreateProductReactionDto) {}
