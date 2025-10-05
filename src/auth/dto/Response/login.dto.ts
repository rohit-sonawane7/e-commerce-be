import { UserResponseDto } from "src/user/dto/response/user-response.dto";

export class LoginResponseDto {
    user: UserResponseDto;
    accessToken: string;
    refreshToken: string;

}
