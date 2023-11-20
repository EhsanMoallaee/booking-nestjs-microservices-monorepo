import { map, catchError } from 'rxjs';
import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationsRepository } from './reservations.repository';
import { CommonUserDto, PAYMENTS_SERVICE } from '@app/common';

@Injectable()
export class ReservationsService {
    constructor(
        private readonly reservationsRepository: ReservationsRepository,
        @Inject(PAYMENTS_SERVICE) private readonly paymentService: ClientProxy
    ) {}

    async create(
        createReservationDto: CreateReservationDto,
        { _id: userId, email }: CommonUserDto
    ) {
        return this.paymentService
            .send('create_charge', {
                ...createReservationDto.charge,
                email
            })
            .pipe(
                map((res) => {
                    return this.reservationsRepository.create({
                        ...createReservationDto,
                        invoiceId: res.id,
                        timestamp: new Date(),
                        userId
                    });
                }),
                catchError(() => {
                    throw new BadRequestException();
                })
            );
    }

    async findAll() {
        return this.reservationsRepository.find({});
    }

    async findOne(_id: string) {
        return this.reservationsRepository.findOne({ _id });
    }

    async update(_id: string, updateReservationDto: UpdateReservationDto) {
        return this.reservationsRepository.findOneAndUpdate(
            { _id },
            { $set: updateReservationDto }
        );
    }

    async remove(_id: string) {
        return this.reservationsRepository.findOneAndDelete({ _id });
    }
}
