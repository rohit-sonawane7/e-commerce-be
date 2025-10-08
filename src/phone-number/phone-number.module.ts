import { Module } from '@nestjs/common';
import { PhoneNumberService } from './phone-number.service';
import phoneNumberConfig from './phone-number.config';
import { PhoneNumberController } from './phone-number.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forFeature(phoneNumberConfig),
  ],
  controllers: [PhoneNumberController],
  providers: [PhoneNumberService],
})
export class PhoneNumberModule { }
