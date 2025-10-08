import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { CreatePhoneNumberDto } from './dto/create-phone-number.dto';
import { UpdatePhoneNumberDto } from './dto/update-phone-number.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PhoneNumberService {
  private readonly FAST2SMS_API_KEY: string;
  private readonly MSG91_AUTH_KEY: string;

  constructor(
    private readonly configService: ConfigService,
  ) {
    this.FAST2SMS_API_KEY = this.configService.get<string>('phoneNumber.apiKey') as string;
    this.MSG91_AUTH_KEY = this.configService.get<string>('phoneNumber.authKey') as string;
  }
  async sendOtpWithFasst2Sms(createPhoneNumberDto: CreatePhoneNumberDto) {
    try {
      const otp = Math.floor(100000 + Math.random() * 900000);

      const response = await axios.post(
        'https://www.fast2sms.com/dev/bulkV2',
        {
          route: "v3",
          message: `Your OTP is ${otp}`,
          language: "english",
          flash: 0,
          numbers: createPhoneNumberDto.phoneNumber,
        },
        {
          headers: {
            authorization: this.FAST2SMS_API_KEY,
            "Content-Type": "application/json",
          },
        }
      );

      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error sending OTP:', error.response ? error.response.data : error.message);
    }
    return 'Otp Sent Successfully';
  }

  async sendOtpWithMsg91(createPhoneNumberDto: CreatePhoneNumberDto) {
    try {
      const otp = Math.floor(100000 + Math.random() * 900000);

      const response = await
        axios.post(
          'https://api.msg91.com/api/v2/sendsms',
          {
            sender: 'ClothinGram',
            route: '4',
            country: '91',
            sms: [
              {
                message: `Verify Otp: ${otp}`,
                to: [createPhoneNumberDto.phoneNumber]
              }
            ]
          },
          {
            headers: {
              authkey: this.MSG91_AUTH_KEY,
              'Content-Type': 'application/json'
            }
          }
        )

      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error sending OTP:', error.response ? error.response.data : error.message);
    }
    return 'Otp Sent Successfully';
  }

  async sendOtp(createPhoneNumberDto: CreatePhoneNumberDto) {
    return createPhoneNumberDto.sendWithFast ? await this.sendOtpWithFasst2Sms(createPhoneNumberDto) :
      await this.sendOtpWithMsg91(createPhoneNumberDto);
  }

  findAll() {
    return `This action returns all phoneNumber`;
  }

  findOne(id: number) {
    return `This action returns a #${id} phoneNumber`;
  }

  update(id: number, updatePhoneNumberDto: UpdatePhoneNumberDto) {
    return `This action updates a #${id} phoneNumber`;
  }

  remove(id: number) {
    return `This action removes a #${id} phoneNumber`;
  }
}
