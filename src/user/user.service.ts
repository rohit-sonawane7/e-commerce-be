import { ConflictException, Injectable } from '@nestjs/common';
import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from './entities/user.entity';
import { CreateUserDto } from './dto/request/create-user.dto';
import { UserMapper } from './mapper/user.mapper';
import { UserResponseDto } from './dto/response/user-response.dto';
import { UpdateUserDto } from './dto/request/update-user.dto';
import { ResponseMessageDto } from 'src/common/dto/Response/response-message.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
  ) { }

  async createUser(dto: CreateUserDto): Promise<UserResponseDto> {
    const exists = await this.userRepo.findOne({ where: { email: dto.email } });
    if (exists) {
      throw new ConflictException('Email already exists');
    }

    const user = UserMapper.toEntity(dto);
    const saved = await this.userRepo.save(user);
    return UserMapper.toResponse(saved);
  }

  async findByEmail(email: string) {
    return this.userRepo.findOne({ where: { email } });
  }

  async findById(id: string) {
    return this.userRepo.findOne({ where: { id } });
  }

  async updateRole(userId: string, role: UserRole) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) {
      throw new ConflictException('User does not exists');
    }
    return this.userRepo.update(userId, { role });
  }

  async updateUser(id: string, user: UpdateUserDto): Promise<ResponseMessageDto> {
    const updateUserData = UserMapper.updateUserMapper(user);
    await this.userRepo.update(id, updateUserData);
    return {
      message: "User Info Updated Successfully"
    }
  }

  async updateUserPassword(id: string, newPassword: string): Promise<ResponseMessageDto> {
    await this.userRepo.update(id, { password: newPassword });
    return {
      message: "User Password Updated Successfully"
    }
  }
}
