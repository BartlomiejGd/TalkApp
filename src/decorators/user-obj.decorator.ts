import { createParamDecorator, ExecutionContext } from '@nestjs/common';


//Decorator which get access to actual logged user from jwt token
export const UserObj = createParamDecorator(
  (data, context: ExecutionContext) => {
      const result = context.switchToHttp().getRequest().user

    return result;
  },
);
