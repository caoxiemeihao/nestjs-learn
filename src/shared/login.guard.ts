import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request, Response } from 'express';

export class LoginGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req: Request = context // [Request, Response, next]
      .getArgs()
      .find((arg) => arg.readable);
    const res: Response = context.getArgs().find((arg) => arg.writable);
    const { sessionId } = req.cookies;

    if (!sessionId) {
      // 这么做会提前结束 http 响应，导致之后 NestJs 对 res 的一系列操作失效
      // res.redirect('/login');
      // 这么做实现不了重定向，因为后续  NestJs 还会覆盖 statusCode
      // res.statusCode = 302;
      // res.setHeader('Location', '/login');
    }

    return !!sessionId;
  }
}

/*
[
  '_readableState',   'readable',
  '_events',          '_eventsCount',
  '_maxListeners',    'socket',
  'connection',       'httpVersionMajor',
  'httpVersionMinor', 'httpVersion',
  'complete',         'headers',
  'rawHeaders',       'trailers',
  'rawTrailers',      'aborted',
  'upgrade',          'url',
  'method',           'statusCode',
  'statusMessage',    'client',
  '_consuming',       '_dumped',
  'next',             'baseUrl',
  'originalUrl',      '_parsedUrl',
  'params',           'query',
  'res'
]
[
  '_events',
  '_eventsCount',
  '_maxListeners',
  'outputData',
  'outputSize',
  'writable',
  '_last',
  'chunkedEncoding',
  'shouldKeepAlive',
  'useChunkedEncodingByDefault',
  'sendDate',
  '_removedConnection',
  '_removedContLen',
  '_removedTE',
  '_contentLength',
  '_hasBody',
  '_trailer',
  'finished',
  '_headerSent',
  'socket',
  'connection',
  '_header',
  '_onPendingData',
  '_sent100',
  '_expect_continue',
  'req',
  'locals'
]
*/
