import { UseGuards, Get, Patch, Param, Body, Controller, HttpStatus, HttpCode, Put } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { User, UserRole } from './entities/user.entity';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/request/update-user.dto';
import { ResponseMessageDto } from 'src/common/dto/Response/response-message.dto';


@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN, UserRole.CUSTOMER)
  @HttpCode(HttpStatus.OK)
  getUserById(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @Patch(':id/role')
  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.OK)
  updateRole(@Param('id') id: string, @Body('role') role: UserRole) {
    return this.userService.updateRole(id, role);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN, UserRole.CUSTOMER)
  @HttpCode(HttpStatus.OK)
  async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto,): Promise<ResponseMessageDto> {
    return this.userService.updateUser(id, updateUserDto);
  }
}
