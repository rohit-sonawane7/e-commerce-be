import { Body, Controller, Post } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('test')
  async sendTest(@Body() body: { to: string }) {
    return this.emailService.sendTestEmail(body.to);
  }

  @Post('promotion')
  async sendPromotion(@Body() body: { to: string; content: string }) {
    return this.emailService.sendPromotionEmail(body.to, body.content);
  }
}
