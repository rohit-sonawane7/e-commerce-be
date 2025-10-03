import { PartialType } from "@nestjs/mapped-types";
import { User } from "src/user/entities/user.entity";

export class LoginResponseDto {
    user: Partial<User>
    access_token: string;
    refresh_token: string;

}
