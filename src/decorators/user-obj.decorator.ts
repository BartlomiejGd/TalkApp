import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserObj = createParamDecorator(
  (data, context: ExecutionContext) => {
      const result = context.switchToHttp().getRequest().user

    return result;
  },
);
