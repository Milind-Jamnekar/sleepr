import { Module } from '@nestjs/common';
import {
  ConfigService,
  ConfigModule as NestjsConfigModule,
} from '@nestjs/config';
import * as joi from 'joi';

@Module({
  imports: [
    NestjsConfigModule.forRoot({
      validationSchema: joi.object({
        MONGODB_URL: joi.string(),
      }),
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
