import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards
} from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { CommonJwtAuthGuard, ICommonUser, currentUser } from '@app/common';

@Controller('reservations')
export class ReservationsController {
    constructor(private readonly reservationsService: ReservationsService) {}

    @UseGuards(CommonJwtAuthGuard)
    @Post()
    async create(
        @Body() createReservationDto: CreateReservationDto,
        @currentUser() user: ICommonUser
    ) {
        return this.reservationsService.create(createReservationDto, user);
    }

    @UseGuards(CommonJwtAuthGuard)
    @Get()
    async findAll() {
        return this.reservationsService.findAll();
    }

    @UseGuards(CommonJwtAuthGuard)
    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.reservationsService.findOne(id);
    }

    @UseGuards(CommonJwtAuthGuard)
    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() updateReservationDto: UpdateReservationDto
    ) {
        return this.reservationsService.update(id, updateReservationDto);
    }

    @UseGuards(CommonJwtAuthGuard)
    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.reservationsService.remove(id);
    }
}
