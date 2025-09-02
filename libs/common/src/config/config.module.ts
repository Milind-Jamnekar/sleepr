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
        JWT_SECRET: joi.string(),
        JWT_EXPIRES_IN: joi.number(),
        RES_PORT: joi.number(),
        AUTH_PORT: joi.number(),
      }),
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
