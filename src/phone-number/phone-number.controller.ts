import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PhoneNumberService } from './phone-number.service';
import { CreatePhoneNumberDto } from './dto/create-phone-number.dto';
import { UpdatePhoneNumberDto } from './dto/update-phone-number.dto';

@Controller('phone-number')
export class PhoneNumberController {
  constructor(private readonly phoneNumberService: PhoneNumberService) { }

  @Post('send-otp')
  sendOtp(@Body() createPhoneNumberDto: CreatePhoneNumberDto) {
    return this.phoneNumberService.sendOtp(createPhoneNumberDto);
  }

  @Get()
  findAll() {
    return this.phoneNumberService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.phoneNumberService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePhoneNumberDto: UpdatePhoneNumberDto) {
    return this.phoneNumberService.update(+id, updatePhoneNumberDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.phoneNumberService.remove(+id);
  }
}
