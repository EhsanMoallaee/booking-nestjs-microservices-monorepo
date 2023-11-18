import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { DatabaseModule, LoggerModule, AUTH_SERVICE } from '@app/common';
import { ReservationsRepository } from './reservations.repository';
import {
    ReservationDocument,
    ReservationSchema
} from './models/reservation.schema';

@Module({
    imports: [
        DatabaseModule,
        DatabaseModule.forFeature([
            { name: ReservationDocument.name, schema: ReservationSchema }
        ]),
        LoggerModule,
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: Joi.object({
                PORT: Joi.number().required(),
                MONGODB_URI: Joi.string().required()
            })
        }),
        ClientsModule.registerAsync([
            {
                name: AUTH_SERVICE,
                useFactory: (configService: ConfigService) => ({
                    transport: Transport.TCP,
                    options: {
                        host: configService.get('AUTH_HOST'),
                        port: configService.get('AUTH_PORT')
                    }
                }),
                inject: [ConfigService]
            }
        ])
    ],
    controllers: [ReservationsController],
    providers: [ReservationsService, ReservationsRepository]
})
export class ReservationsModule {}
