import { Controller, Post, UseGuards, Res } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { currentUser } from './decorator/current-user.decorator';
import { UserDocument } from './users/models/user.schema';
import { JwtAuthGuard } from '@app/common';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(
        @currentUser() user: UserDocument,
        @Res({ passthrough: true }) response: Response
    ) {
        await this.authService.login(user, response);
        response.send(user);
    }

    @UseGuards(JwtAuthGuard)
    @MessagePattern('authenticate')
    async authenticate() {}
}
