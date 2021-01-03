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

  private store: FsStore<Array<RecordSession>>;
  genSessionId = SessionService.genSessionId;

  constructor() {
    this.store = new FsStore(join(FsStore.STORE_DIR, 'session.json'));
  }

  getSession(
    sessionId: string,
  ): { session: RecordSession | undefined; sessions: Array<RecordSession> } {
    const sessions = this.store.get() || [];
    // 这里考虑文件IO sessions、session 一口气返回
    return {
      session: sessions.find((session) => session.sessionId === sessionId),
      sessions,
    };
  }

  setSession(sessionId: string, user: User): boolean {
    const { session, sessions } = this.getSession(sessionId);
    if (session) {
      session.updateTime = Date.now();
    } else {
      sessions.push({
        sessionId: this.genSessionId(),
        updateTime: Date.now(),
        user,
      });
    }
    return this.store.set('data', sessions);
  }
}
