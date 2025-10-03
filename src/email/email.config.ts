import { registerAs } from '@nestjs/config';

export default registerAs('email', () => ({
    apiKey: process.env.BREVO_API_KEY,
    fromEmail: process.env.EMAIL_FROM || 'no-reply@myapp.com',
    fromName: process.env.EMAIL_FROM_NAME || 'MyApp',
}));
