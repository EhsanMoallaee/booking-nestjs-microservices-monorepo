import { Type } from 'class-transformer';
import {
    IsDate,
    IsString,
    IsNotEmpty,
    IsDefined,
    IsNotEmptyObject,
    ValidateNested
} from 'class-validator';
import { CreateChargeDto } from '@app/common';

export class CreateReservationDto {
    @IsDate()
    @Type(() => Date)
    startDate: Date;

    @IsDate()
    @Type(() => Date)
    endDate: Date;

    @IsString()
    @IsNotEmpty()
    placeId: string;

    @IsString()
    @IsNotEmpty()
    invoiceId: string;

    @IsDefined()
    @IsNotEmptyObject()
    @ValidateNested()
    charge: CreateChargeDto;
}
