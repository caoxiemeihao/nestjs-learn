import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { User } from 'src/interface/user';
import { FsStore } from 'src/utils/fs-store';

export interface RecordSession {
  sessionId: string;
  /** 最后更新时间 */
  updateTime: number;
  user: User;
}

@Injectable()
export class SessionService {
  static genSessionId(): string {
    return `${Date.now()}-${~~(Math.random() * 10000)}`;
  }

  static store = new FsStore<Array<RecordSession>>(
    join(FsStore.STORE_DIR, 'session.json'),
  );

  static getSession(
    sessionId = '',
  ): { session: RecordSession | undefined; sessions: Array<RecordSession> } {
    const sessions = this.store.get() || [];
    // 这里考虑文件IO sessions、session 一口气返回
    return {
      session: sessions.find((session) => session.sessionId === sessionId),
      sessions,
    };
  }

  static addSession(user: User): false | string {
    let { sessions } = this.getSession();
    const sessionId = this.genSessionId();
    sessions = sessions.filter(
      // 过滤掉老的 session
      (session) => session.user.username !== user.username,
    );
    sessions.push({
      sessionId,
      updateTime: Date.now(),
      user,
    });
    return this.store.set('data', sessions) ? sessionId : false;
  }

  static updateSession(sessionId: string): boolean {
    const { session, sessions } = this.getSession(sessionId);
    if (session) {
      session.updateTime = Date.now();
    }
    return session ? this.store.set('data', sessions) : false;
  }

  private store = SessionService.store;

  constructor() {
    SessionService.genSessionId.toString = function () {
      return this(); // 能当方法用，也能到属性用
    };
  }

  genSessionId = SessionService.genSessionId;

  getSession = SessionService.getSession;

  /** 返回 sessionId 或者失败 */
  addSession = SessionService.addSession;

  /** 更新 session 中的时间戳 */
  updateSession = SessionService.updateSession;
}
