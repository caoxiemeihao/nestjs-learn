import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { User } from 'src/interface/user';
import {
  ResponseModel,
  SuccessModel,
  ErrorModel,
} from 'src/shared/response.model';
import { SessionService } from 'src/shared/session.service';
import { UserService } from 'src/shared/user.service';

@Injectable()
export class LoginService {
  private quotations = [
    '不要憎恨你的敌人，那会影响你的判断力',
    '离你的朋友近些，但离你的敌人要更近，这样你才能更了解他',
    '伟大的人不是生下来就伟大的，而是在成长过程中显示其伟大的',
    '不要让别人知道你的想法',
    '如果你认为我不知道其中的真相那就是在侮辱我的智慧',
    '我花了一辈子，就学会了小心，女人和小孩能够粗心大意，但男人不行',
    '不要憎恨你的敌人，否则你将做出错误的判断',
    '不要让任何人知道你在想什么',
    '你做出了这个决定，这是你的代价',
    '让朋友低估你的优点，让敌人高估你的缺点',
    '不要轻易说出你的理想，不给别人嘲笑你的机会',
    '最好的威胁是不采取行动，一旦采取行动却没收到效果，人们就不再怕威胁了',
    '不要说不可能，没有什么不可能',
    '把意外当做是对自己尊严侮辱的人永远不会再遭到意外',
    '当你说不时，你要使不听上去像是一样好听',
    '社会上常常会有突如其来的侮辱，那是必须忍受的',
    '除了朋友低估你的优点，世上最大的天然优势就是敌人高估你的缺陷',
    '友谊就是一切。比天赋更重要，比政府更重要。和家人同样重要',
    '在一秒钟内看到本质的人和花半辈子也看不清一件事本质的人,自然是不一样的命运',
  ];

  constructor(private session: SessionService, private user: UserService) { }

  renderData(
    sessionId: string,
  ): { name: string; user: User | undefined; quotation: string } {
    const { session, sessions } = this.session.getSession(sessionId);
    return {
      name: 'login.service.LoginService',
      user: session?.user,
      quotation: this.quotations[~~(Math.random() * this.quotations.length)],
    };
  }

  login(username: string, password: string): ResponseModel {
    const users = this.user.getUsers();
    const user = users.find((u) => u.username === username);

    if (!user) return new ErrorModel({ message: '用户不存在' });
    if (user.password !== password) {
      return new ErrorModel({ message: '密码输入错误' });
    }

    return new SuccessModel({ message: '登录成功' });
  }

  register(username: string, password: string): ResponseModel {
    if (!username) return new ErrorModel({ message: '用户名必填' });
    if (!password) return new ErrorModel({ message: '密码必填' });
    if (password.length < 6) {
      return new ErrorModel({ message: '密码必须大于6位' });
    }
    const users = this.user.getUsers();
    if (users.find((u) => u.username === username)) {
      return new ErrorModel({ message: '用户已经存在' });
    }

    this.user.addUser({ username, password });
    return new SuccessModel({ message: '注册成功' });
  }

  /** 成功返回 sessionId */
  addSession(res: Response, user: User) {
    const sessionId = this.session.addSession(user);
    if (sessionId) res.cookie('sessionId', sessionId);
    return sessionId;
  }

  updateSession(req: Request) {
    const sessionId = req.cookies.sessionId;
    return this.session.updateSession(sessionId);
  }
}
