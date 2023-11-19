import { Controller } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreateChargeDto } from '../../../libs/common/src/dtos/create-charge.dto';

@Controller()
export class PaymentsController {
    constructor(private readonly paymentsService: PaymentsService) {}

    @MessagePattern('create_charge')
    async createCharge(data: CreateChargeDto) {
        return this.paymentsService.createCharge(data);
    }
}
