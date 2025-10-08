import { Controller, Post, Param, Body, Req, Get } from '@nestjs/common';
import { ProductReactionService } from './product-reaction.service';

@Controller('reactions')
export class ProductReactionController {
  constructor(private readonly reactionService: ProductReactionService) { }

  @Post(':productId')
  async react(
    @Param('productId') productId: string,
    @Body() body: { type: 'like' | 'dislike'; sessionId?: string },
    @Req() req,
  ) {
    const userId = req.user?.id;
    const { type, sessionId } = body;
    return this.reactionService.react(productId, type, userId, sessionId);
  }

  @Get(':productId/stats')
  async getStats(@Param('productId') productId: string) {
    return this.reactionService.getStats(productId);
  }
}
