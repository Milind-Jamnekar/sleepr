import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { ReservationsRepository } from './reservations.repository';
import {
  AUTH_SERVICE,
  ConfigModule,
  DatabaseModule,
  LoggerModule,
} from '@app/common';
import {
  ReservationDocument,
  ReservationSchema,
} from './entities/reservation.schema';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      { name: ReservationDocument.name, schema: ReservationSchema },
    ]),
    LoggerModule,
    ConfigModule,
    // ClientsModule.register([
    //   {
    //     name: AUTH_SERVICE,
    //     transport: Transport.TCP,
    //     options: {
    //       host: '0.0.0.0',
    //       port: 3002,
    //     },
    //   },
    // ]),

    ClientsModule.registerAsync([
      {
        name: AUTH_SERVICE,
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get('AUTH_HOST'),
            port: configService.get('AUTH_TCP_PORT'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService, ReservationsRepository],
})
export class ReservationsModule {}
