import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import axios from 'axios';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  getHello(): string {
    return 'Hello World!';
  }

  @Cron('*/10 * * * *')
  async keepAlivePing() {
    if (process.env.NODE_ENV !== 'production') return;

    const url = process.env.RENDER_EXTERNAL_URL;
    if (!url) return;
    
    try {
      await axios.get(url, { timeout: 5000 });
      this.logger.log(`Self-pinged ${url} to keep instance awake`);
    } catch (err) {
      this.logger.warn(`Ping failed for ${url}: ${err.message}`);
    }
  }
}
