import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserDocument } from '../users/models/user.schema';

const getCurrentUserByContext = (context: ExecutionContext): UserDocument => {
    return context.switchToHttp().getRequest().user;
}

export const currentUser = createParamDecorator(
    (_date: unknown, context: ExecutionContext) => getCurrentUserByContext(context)
)