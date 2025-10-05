import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator';

export class ResetPasswordDto {

    @IsString()
    id: string;

    @IsString()
    @MinLength(6)
    currentPassword: string;

    @IsString()
    @MinLength(6)
    newPassword: string;

}
