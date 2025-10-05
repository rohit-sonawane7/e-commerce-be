import { UserRole } from "src/user/entities/user.entity";

export class UserResponseDto {
    id: string;
    role: UserRole;
    email: string;
    lastName: string;
    firstName: string;
    isEmailVerified: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
