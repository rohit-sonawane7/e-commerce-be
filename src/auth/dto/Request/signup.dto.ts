import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator';

export class SignUpRequestDto {

  @IsString()
  @MinLength(2)
  firstName: string;

  @IsString()
  @IsOptional()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

}
