import {
	AUTH_SERVICE,
	ConfigModule,
	DatabaseModule,
	LoggerModule,
} from "@app/common";
import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ClientsModule, Transport } from "@nestjs/microservices";
import {
	ReservationDocument,
	ReservationSchema,
} from "./entities/reservation.schema";
import { ReservationsController } from "./reservations.controller";
import { ReservationsRepository } from "./reservations.repository";
import { ReservationsService } from "./reservations.service";

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
						host: configService.get("AUTH_HOST"),
						port: configService.get("AUTH_TCP_PORT"),
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
