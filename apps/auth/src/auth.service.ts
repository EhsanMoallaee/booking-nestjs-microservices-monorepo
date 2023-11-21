import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { UserDocument } from '@app/common';
import { ConfigService } from '@nestjs/config';
import { ITokenPayload } from './interfaces/token-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService
    ) {}

    async login(user: UserDocument, response: Response) {
        const tokenPayload: ITokenPayload = {
            userId: user._id.toHexString()
        };
        const expires = new Date();
        expires.setSeconds(
            expires.getSeconds() + this.configService.get('JWT_EXPIRATION')
        );
        const token = this.jwtService.sign(tokenPayload);
        response.cookie('Authentication', token, {
            httpOnly: true,
            expires
        });
    }
}
