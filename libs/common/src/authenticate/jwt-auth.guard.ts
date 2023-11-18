import {
    Injectable,
    CanActivate,
    ExecutionContext,
    Inject
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable, tap, map } from 'rxjs';
import { AUTH_SERVICE } from '../constants/services';
import { CommonUserDto } from '../dtos';

@Injectable()
export class CommonJwtAuthGuard implements CanActivate {
    constructor(
        @Inject(AUTH_SERVICE) private readonly authClient: ClientProxy
    ) {}

    canActivate(
        context: ExecutionContext
    ): boolean | Promise<boolean> | Observable<boolean> {
        const jwt = context.switchToHttp().getRequest().cookies?.Authentication;
        if (!jwt) {
            return false;
        }

        return this.authClient
            .send<CommonUserDto>('authenticate', { Authentication: jwt })
            .pipe(
                tap((res) => {
                    context.switchToHttp().getRequest().user = res;
                }),
                map(() => true)
            );
    }
}
