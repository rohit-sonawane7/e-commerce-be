import { IsEmail, IsString, MinLength, IsEnum, IsOptional, isString } from 'class-validator';

export class SignUpRequestDto {

  @IsString()
  @MinLength(2)
  first_name: string;

  @IsString()
  @IsOptional()
  last_name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

}
