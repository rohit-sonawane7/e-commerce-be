import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import { SignUpRequestDto } from './dto/Request/signup.dto';
import { LoginRequestDto } from './dto/Request/login.dto';
import { SignUpResponseDto } from './dto/Response/signup.dto';
import { UserMapper } from 'src/user/mapper/user.mapper';
import { JwtAccessTokenDto } from './dto/Response/jwt.dto';
import { LoginResponseDto } from './dto/Response/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,

  ) { }

  async generateTokens(user: Partial<User>): Promise<JwtAccessTokenDto> {

    const accessToken = await this.jwtService.signAsync(user, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: '15m',
    });

    const refreshToken = await this.jwtService.signAsync(user, {
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

  async signup(dto: SignUpRequestDto): Promise<SignUpResponseDto> {
    const existingUser = await this.userService.findByEmail(dto.email);
    if (existingUser) throw new ConflictException('Email already registered');
    dto.password = await bcrypt.hash(dto.password, 10);
    const user = await this.userService.createUser(UserMapper.toEntityFromCreate(dto));
    return UserMapper.toResponseDto(user);
  }

  async login(dto: LoginRequestDto): Promise<LoginResponseDto> {
    const user = await this.userService.findByEmail(dto.email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    const jwtTokens = await this.generateTokens(UserMapper.jwtUserMapper(user));
    return {
      user,
      access_token: jwtTokens.access_token,
      refresh_token: jwtTokens.refresh_token

    }
  }

}
