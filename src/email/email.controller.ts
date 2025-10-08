import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) { }

  // @Post('test')
  // @HttpCode(HttpStatus.OK)
  // async sendTest(@Body() body: { to: string }) {
  //   return this.emailService.signUpAndVerifyEmail(body.to);
  // }

  @Post('promotion')
  @HttpCode(HttpStatus.OK)
  async sendPromotion(@Body() body: { to: string; content: string }) {
    return this.emailService.sendPromotionEmail(body.to, body.content);
  }
}
