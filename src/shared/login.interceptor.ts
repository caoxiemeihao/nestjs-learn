import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Request, Response } from 'express';
import { SessionService } from './session.service';

@Injectable()
export class LoginInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    // console.log('请求之前干点啥...');
    const req: Request = context.getArgs().find((arg) => arg.readable);
    const res: Response = context.getArgs().find((arg) => arg.writable);

    const { sessionId } = req.cookies;
    const { session } = SessionService.getSession(sessionId);

    if (!session?.user?.username) {
      // res.redirect('/login'); // 这么做会提前结束 http 响应，导致之后 NestJs 对 res 的一系列操作引起报错
      res.statusCode = 302;
      res.setHeader('Location', '/login');
      return;
    }

    return next.handle().pipe(
      map((data) => data), // 这里能收到 Controller 返回(注入模板)的数据
      tap(() => {
        /* console.log('请求之后干点啥...') */
      }),
    );
  }
}

/*
General
  Request URL: http://localhost:3000/home
  Request Method: GET
  Status Code: 302 Found
  Remote Address: [::1]:3000
  Referrer Policy: strict-origin-when-cross-origin

Response Headers
  HTTP/1.1 302 Found
  X-Powered-By: Express
  Location: /login
  Vary: Accept
  Content-Type: text/html; charset=utf-8
  Content-Length: 56
  Date: Mon, 04 Jan 2021 03:25:33 GMT
  Connection: keep-alive
*/
