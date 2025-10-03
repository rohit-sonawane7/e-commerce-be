import { SignUpResponseDto } from 'src/auth/dto/Response/signup.dto';
import { User, UserRole } from '../entities/user.entity';
import { AuthProcessEnums } from 'src/auth/enums/auth.enums';
import { SignUpRequestDto } from 'src/auth/dto/Request/signup.dto';
import { JwtAccessTokenDto } from 'src/auth/dto/Response/jwt.dto';
import { LoginResponseDto } from 'src/auth/dto/Response/login.dto';

export class UserMapper {

    static toEntityFromCreate(dto: SignUpRequestDto): User {
        const user = new User();
        user.first_name = dto.first_name;
        user.last_name = dto.last_name;
        user.email = dto.email;
        user.password = dto.password;
        user.role = UserRole.CUSTOMER;
        user.is_email_verified = false;
        return user;
    }

    static toResponseDto(user: User): SignUpResponseDto {
        return {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            role: user.role,
            is_email_verified: user.is_email_verified,
            created_at: user.created_at,
            updated_at: user.updated_at,
            message: AuthProcessEnums.SIGN_UP
        };
    }

    static toResponseDtoList(users: User[]): SignUpResponseDto[] {
        return users.map((user) => this.toResponseDto(user));
    }

    static jwtUserMapper(user: User): Partial<User> {
        return {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            role: user.role,
            email: user.email,
            is_email_verified: user.is_email_verified,
        }
    }

    static loginUserMapper(user: User, jwtAccessToken: JwtAccessTokenDto): LoginResponseDto {
        return {
            user: {
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                role: user.role,
                email: user.email,
                is_email_verified: user.is_email_verified,
            },
            access_token: jwtAccessToken.access_token,
            refresh_token: jwtAccessToken.refresh_token
        }
    }
}
