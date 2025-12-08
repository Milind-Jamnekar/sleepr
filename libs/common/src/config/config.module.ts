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
        MONGODB_URL: joi.string().required(),
        JWT_SECRET: joi.string().required(),
        JWT_EXPIRES_IN: joi.number().required(),
        RES_PORT: joi.number().required(),
        AUTH_HTTP_PORT: joi.number().required(),
        AUTH_TCP_PORT: joi.number().required(),
      }),
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
