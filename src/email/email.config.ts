import { registerAs } from '@nestjs/config';

export default registerAs('email', () => ({
    apiKey: process.env.BREVO_API_KEY,
    fromEmail: process.env.EMAIL_FROM,
    fromName: process.env.EMAIL_FROM_NAME,
    replyToEmail: process.env.EMAIL_TO_REPLY,
}));
