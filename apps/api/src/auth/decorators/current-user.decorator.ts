import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserResponseDto } from '../../modules/users/dto/user-response.dto';

interface RequestWithUser extends Request {
  user: UserResponseDto;
}

export const CurrentUser = createParamDecorator(
  (data: keyof UserResponseDto | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<RequestWithUser>();
    const user = request.user;

    return data ? user?.[data] : user;
  },
);
