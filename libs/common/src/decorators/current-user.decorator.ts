// import { UserDocument } from './../../../../apps/auth/src/users/models/user.schema';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CommonUserDto } from '../dtos';
// import { UserDocument } from '../users/models/user.schema';s

const getCurrentUserByContext = (context: ExecutionContext): CommonUserDto => {
    return context.switchToHttp().getRequest().user;
};

export const currentUser = createParamDecorator(
    (_date: unknown, context: ExecutionContext) =>
        getCurrentUserByContext(context)
);
