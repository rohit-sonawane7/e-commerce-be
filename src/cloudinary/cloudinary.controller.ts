import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile, Query, UploadedFiles } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from './cloudinary.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserRole } from 'src/user/entities/user.entity';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ResponseMessageDto } from 'src/common/dto/Response/response-message.dto';

@Controller('cloudinary')
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) { }

  @Post('upload-file')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @UseInterceptors(FileInterceptor('image'))
  async uploadProduct(
    @UploadedFile() file: Express.Multer.File,
    @Query('productId') productId: string
  ): Promise<ResponseMessageDto> {
    return this.cloudinaryService.uploadProduct(file, productId);
  }

  @Post('upload-files')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @UseInterceptors(FilesInterceptor('images'))
  async uploadProducts(
    @UploadedFiles() files: Express.Multer.File[],
    @Query() productId: string,
  ) {
    return this.cloudinaryService.uploadProducts(files, productId);
  }
}
