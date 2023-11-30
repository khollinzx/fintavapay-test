import { Module } from '@nestjs/common';
import { AppConfigModule } from '../config/app/config.module';
import { JsonResponseService } from './jsonResponse.service';

@Module({
  imports: [AppConfigModule],
  providers: [JsonResponseService],
  exports: [JsonResponseService],
})
export class JsonResponseModule {}
