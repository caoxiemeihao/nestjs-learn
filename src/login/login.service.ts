import { Injectable } from '@nestjs/common';
import { User } from 'src/interface/user';
import { SessionService } from 'src/shared/session.service';

@Injectable()
export class LoginService {
  constructor(private sessionUtil: SessionService) {}

  tplData(sessionId: string): { token: string; user: User | undefined } {
    const { session, sessions } = this.sessionUtil.getSession(sessionId);
    console.log(sessions, session);
    return {
      token: 'login.service.LoginService',
      user: session?.user,
    };
  }
}
