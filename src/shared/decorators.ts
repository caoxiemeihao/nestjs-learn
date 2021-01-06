import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { User } from 'src/interface/user';
import { SessionService } from './session.service';

export interface RequestExt extends Request {
  user: User;
}

/**
 * 通过 sessionId 获取当前 session
 */
export const SessionUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request: RequestExt = ctx.switchToHttp().getRequest();

    const sessionId = request.cookies.sessionId;
    const { session = { user: {} as any } } = SessionService.getSession(
      sessionId,
    );
    return (request.user = session.user);
  },
);
