import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { ResponseMessageDto } from './common/dto/Response/response-message.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health-check')
  @HttpCode(HttpStatus.OK)
  healthCheck(): ResponseMessageDto {
    return { message: "success" }
  }
}
