import { SignUpResponseDto } from 'src/auth/dto/Response/signup.dto';
import { User, UserRole } from '../entities/user.entity';
import { AuthProcessEnums } from 'src/auth/enums/auth.enums';
import { SignUpRequestDto } from 'src/auth/dto/Request/signup.dto';
import { JwtAccessTokenDto } from 'src/auth/dto/Response/jwt.dto';
import { LoginResponseDto } from 'src/auth/dto/Response/login.dto';
import { CreateUserDto } from '../dto/request/create-user.dto';
import { UserResponseDto } from '../dto/response/user-response.dto';
import { UpdateUserDto } from '../dto/request/update-user.dto';

export class UserMapper {

    static toEntity(dto: CreateUserDto): User {
        const user = new User();
        user.first_name = dto.firstName;
        user.last_name = dto.lastName;
        user.email = dto.email;
        user.password = dto.password;
        user.role = dto.role;;
        user.is_email_verified = false;
        return user;
    }

    static toResponse(user: User): UserResponseDto {
        return {
            id: user.id,
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            role: user.role,
            isEmailVerified: user.is_email_verified,
            createdAt: user.created_at,
            updatedAt: user.updated_at
        };
    }

    static updateUserMapper(user: UpdateUserDto): Partial<User> {
        return {
            first_name: user.firstName,
            last_name: user.lastName,
            updated_at: new Date()
        };
    }

    static toResponseDtoList(users: User[]): SignUpResponseDto[] {
        return users.map((user) => this.toResponse(user));
    }

    static jwtUserMapper(user: User): UserResponseDto {
        return {
            id: user.id,
            firstName: user.first_name,
            lastName: user.last_name,
            role: user.role,
            email: user.email,
            isEmailVerified: user.is_email_verified
        }
    }

    static loginUserMapper(user: User, jwtAccessToken: JwtAccessTokenDto): LoginResponseDto {
        return {
            user: {
                id: user.id,
                firstName: user.first_name,
                lastName: user.last_name,
                role: user.role,
                email: user.email,
                isEmailVerified: user.is_email_verified,
            },
            accessToken: jwtAccessToken.access_token,
            refreshToken: jwtAccessToken.refresh_token
        }
    }
}
