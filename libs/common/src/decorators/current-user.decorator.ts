import { UserDocument } from '@app/common';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
// import { ICommonUser } from '../dtos';
// import { UserDocument } from '../users/models/user.schema';s

const getCurrentUserByContext = (context: ExecutionContext): UserDocument => {
    return context.switchToHttp().getRequest().user;
};

export const currentUser = createParamDecorator(
    (_date: unknown, context: ExecutionContext) =>
        getCurrentUserByContext(context)
);
