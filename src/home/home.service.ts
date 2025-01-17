import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { User } from 'src/interface/user';
import { SessionService } from 'src/shared/session.service';
import { getZhihuBillboard } from 'src/utils/zhihu-billboard';

@Injectable()
export class HomeService {
  constructor(private session: SessionService) {}

  renderData(req: Request) {
    // const user = this.getUser(req);
    return {
      name: 'home.service.HomerSerivce',
      // user,
      zhihuBillboards: getZhihuBillboard(),
    };
  }

  /**
   * @todo 21-01-04
   * 当前用笨办法去 session 中取出用户，后期通过装饰器注入
   *
   * @deprecated 21-01-06 通过 src/shared/decorators.ts - @SessionUser() user 实现
   */
  getUser(req: Request): User {
    const sessionId = req.cookies.sessionId;
    const { session = { user: {} as any } } = this.session.getSession(
      sessionId,
    );
    return session.user;
  }
}
