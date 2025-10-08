import { registerAs } from '@nestjs/config';

export default registerAs('phoneNumber', () => ({
    apiKey: process.env.FAST2SMS_API_KEY,
    authKey: process.env.MSG91_AUTH_KEY,
}));
