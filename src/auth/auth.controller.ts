import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpRequestDto } from './dto/Request/signup.dto';
import { LoginRequestDto } from './dto/Request/login.dto';
import { SignUpResponseDto } from './dto/Response/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('signup')
  signup(@Body() dto: SignUpRequestDto): Promise<SignUpResponseDto> {
    return this.authService.signup(dto);
  }

  @Post('login')
  login(@Body() dto: LoginRequestDto) {
    return this.authService.login(dto);
  }

  @Post('refresh')
  refresh(@Body() body: { refresh_token: string }) {
    return this.authService.verifyRefreshToken(body.refresh_token);
  }
}
