import { IsString } from 'class-validator';

export class ResponseMessageDto {

    @IsString()
    message: string

}
