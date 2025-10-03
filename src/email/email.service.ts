import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as SibApiV3Sdk from 'sib-api-v3-sdk';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private readonly brevoClient: SibApiV3Sdk.TransactionalEmailsApi;
  private readonly fromEmail: string;
  private readonly fromName: string;

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get<string>('email.apiKey');
    this.fromEmail = this.configService.get<string>('email.fromEmail') as string;
    this.fromName = this.configService.get<string>('email.fromName') as string;

    const defaultClient = SibApiV3Sdk.ApiClient.instance;
    const auth = defaultClient.authentications['api-key'];
    auth.apiKey = apiKey;

    this.brevoClient = new SibApiV3Sdk.TransactionalEmailsApi();
  }

  private async sendEmail(to: string, subject: string, htmlContent: string) {
    try {
      const email = {
        sender: { name: this.fromName, email: this.fromEmail },
        to: [{ email: to }],
        subject,
        htmlContent,
      };

      const response = await this.brevoClient.sendTransacEmail(email);
      this.logger.log(`Email sent to ${to}: ${JSON.stringify(response)}`);
      return response;
    } catch (error) {
      this.logger.error(`Failed to send email to ${to}`, error);
      throw error;
    }
  }

  async sendAccountCreatedEmail(to: string) {
    return this.sendEmail(
      to,
      'Welcome to MyApp!',
      `<h1>Account Created Successfully</h1>
       <p>Your account has been created successfully. Please verify your email to continue.</p>`
    );
  }

  async sendOtpVerificationEmail(to: string, otp: string) {
    return this.sendEmail(
      to,
      'Verify your email - OTP',
      `<h1>Email Verification</h1>
       <p>Your OTP is: <b>${otp}</b></p>`
    );
  }

  async sendForgotPasswordEmail(to: string, resetLink: string) {
    return this.sendEmail(
      to,
      'Reset your password',
      `<h1>Forgot Password</h1>
       <p>Click <a href="${resetLink}">here</a> to reset your password.</p>`
    );
  }

  async sendTestEmail(to: string) {
    return this.sendEmail(to, 'Test Email', '<p>This is a test email from MyApp.</p>');
  }

  async sendPromotionEmail(to: string, content: string) {
    return this.sendEmail(
      to,
      'Special Promotion',
      `<h1>Promotion</h1><p>${content}</p>`
    );
  }
}
