import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User, UserRole } from '../user/entities/user.entity';
import { SignUpRequestDto } from './dto/Request/signup.dto';
import { LoginRequestDto } from './dto/Request/login.dto';
import { SignUpResponseDto } from './dto/Response/signup.dto';
import { UserMapper } from 'src/user/mapper/user.mapper';
import { JwtAccessTokenDto } from './dto/Response/jwt.dto';
import { LoginResponseDto } from './dto/Response/login.dto';
import { UserResponseDto } from 'src/user/dto/response/user-response.dto';
import { ResetPasswordDto } from './dto/Request/reset-password.dto';
import { ResponseMessageDto } from '../common/dto/Response/response-message.dto';
import { EmailService } from 'src/email/email.service';
import { ConfigService } from '@nestjs/config';
// import { instanceToPlain } from 'class-transformer';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
    private readonly configService: ConfigService
  ) { }

  async signup(dto: SignUpRequestDto): Promise<SignUpResponseDto> {
    const existingUser = await this.userService.findByEmail(dto.email);
    if (existingUser) throw new ConflictException('Email already registered');
    dto.password = await bcrypt.hash(dto.password, 10);
    const createdUser = await this.userService.createUser({ ...dto, role: UserRole.CUSTOMER });

    const emailData = {
      YEAR: new Date().getFullYear(),
      NAME: createdUser.firstName,
      LOGO_URL: "/home/rohitsonawane/SELF/BUSINESS/BE/fashion-backend/src/assests/logo.png",
      BRAND_NAME: this.configService.get<string>('BRAND_NAME'),
      SUPPORT_EMAIL: this.configService.get<string>('SUPPORT_EMAIL'),
      VERIFICATION_URL: this.configService.get<string>('VERIFICATION_URL')
    }
    await this.emailService.signUpAndVerifyEmail(createdUser.email, emailData);
    return createdUser;
  }

  async generateTokens(user: Partial<User>): Promise<JwtAccessTokenDto> {
    const payload = {
      id: user.id,
      role: user.role,
      email: user.email,
      lastName: user.last_name,
      firstName: user.first_name,
      isEmailVerified: user.is_email_verified
    }

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: '15m',
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d',
    });

    return { access_token: accessToken, refresh_token: refreshToken };
  }

  async verifyRefreshToken(token: string): Promise<JwtAccessTokenDto> {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
      return this.generateTokens(UserMapper.jwtUserMapper(payload));
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('Invalid credentials');

    return user;
  }

  async login(dto: LoginRequestDto): Promise<LoginResponseDto> {
    const user = await this.userService.findByEmail(dto.email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    const jwtTokens = await this.generateTokens(user);
    return UserMapper.loginUserMapper(user, jwtTokens);
  }

  async resetPassword(dto: ResetPasswordDto): Promise<ResponseMessageDto> {
    const user = await this.userService.findById(dto.id);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isPasswordValid = await bcrypt.compare(dto.currentPassword, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('Invalid Current Password');

    user.password = await bcrypt.hash(dto.newPassword, 10);
    await this.userService.updateUserPassword(dto.id, dto.newPassword);
    return { message: "Password Updated Successfully" };
  }

}
