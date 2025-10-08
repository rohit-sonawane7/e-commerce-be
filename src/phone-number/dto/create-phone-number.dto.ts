import { IsEmail, IsPhoneNumber, IsString, IsBoolean, IsOptional } from "class-validator";

export class CreatePhoneNumberDto {
    @IsPhoneNumber('IN', { message: 'phoneNumber must be a valid Indian phone number' })
    phoneNumber: string;

    @IsOptional()
    @IsString()
    sendWithFast?: boolean;

    @IsOptional()
    @IsBoolean()
    sendWithMsg?: boolean;
}

