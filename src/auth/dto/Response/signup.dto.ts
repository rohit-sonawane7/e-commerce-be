import { PartialType } from "@nestjs/mapped-types";
import { User } from "src/user/entities/user.entity";

export class SignUpResponseDto extends PartialType(User) {
    message: string;
}
