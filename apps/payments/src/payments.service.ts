import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { NOTIFICATIONS_SERVICE } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { PaymentsCreateChargeDto } from './dto/payments-create-charge.dto';

@Injectable()
export class PaymentsService {
    readonly stripe = new Stripe(this.configService.get('STRIPE_SECRET_KEY'));
    constructor(
        private readonly configService: ConfigService,
        @Inject(NOTIFICATIONS_SERVICE)
        private readonly notificationService: ClientProxy
    ) {}

    async createCharge({ card, amount, email }: PaymentsCreateChargeDto) {
        const paymentMethod = await this.stripe.paymentMethods.create({
            type: 'card',
            card
        });
        const paymentIntent = await this.stripe.paymentIntents.create({
            payment_method: paymentMethod.id,
            amount: amount * 100,
            confirm: true,
            payment_method_types: ['card'],
            currency: 'usd'
        });

        const text = `Your payment of $${amount} has completed successfully`;
        this.notificationService.emit('notify_email', { email, text });

        return paymentIntent;
    }
}
