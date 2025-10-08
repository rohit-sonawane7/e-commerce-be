import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductReaction } from './entities/product-reaction.entity';
import { ProductReactionController } from './product-reaction.controller';
import { ProductReactionService } from './product-reaction.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductReaction])],
  controllers: [ProductReactionController],
  providers: [ProductReactionService],
  exports: [ProductReactionService],
})
export class ProductReactionModule { }
