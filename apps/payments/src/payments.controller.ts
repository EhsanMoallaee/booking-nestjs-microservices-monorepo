import { Controller, ValidationPipe, UsePipes } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { PaymentsService } from './payments.service';
import { CreateChargeDto } from '@app/common';

@Controller()
export class PaymentsController {
    constructor(private readonly paymentsService: PaymentsService) {}

    @MessagePattern('create_charge')
    @UsePipes(new ValidationPipe())
    async createCharge(data: CreateChargeDto) {
        return this.paymentsService.createCharge(data);
    }
}
