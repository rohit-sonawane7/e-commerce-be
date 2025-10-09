import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductReaction } from './entities/product-reaction.entity';

@Injectable()
export class ProductReactionService {
  constructor(
    @InjectRepository(ProductReaction) private reactionRepo: Repository<ProductReaction>,
  ) { }

  async react(
    productId: string,
    type: 'like' | 'dislike',
    userId?: string,
    sessionId?: string,
  ) {
    let existing: ProductReaction | null = null;

    if (userId) {
      existing = await this.reactionRepo.findOne({ where: { product_id: productId, user_id: userId } });
    } else if (sessionId) {
      existing = await this.reactionRepo.findOne({ where: { product_id: productId, session_id: sessionId } });
    }

    if (existing && existing.type === type) {
      return { message: `Already ${type}d`, status: 'no_change' };
    }

    if (existing) {
      existing.type = type;
      await this.reactionRepo.save(existing);
      return { message: `Reaction updated to ${type}`, status: 'updated' };
    }

    const reaction = this.reactionRepo.create({
      product_id: productId,
      session_id: sessionId,
      user_id: userId,
      type,
      created_at: new Date()
    });

    await this.reactionRepo.save(reaction);
    return { message: `${type} added`, status: 'created' };
  }

  async getStats(productId: string) {
    const reactions = await this.reactionRepo.find({ where: { product_id: productId } });
    const likeCount = reactions.filter((r) => r.type === 'like').length;
    const dislikeCount = reactions.filter((r) => r.type === 'dislike').length;
    return { productId, likeCount, dislikeCount };
  }

  async mergeGuestData(userId: string, sessionId: string) {
    await this.reactionRepo.update(sessionId, { user_id: userId, session_id: undefined });
  }
}
