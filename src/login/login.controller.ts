import { Controller, Get, Post, Render, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor(private service: LoginService) {}

  @Get()
  @Render('login')
  index(@Req() req: Request) {
    return this.service.renderData(req.cookies.sessionId);
  }

  @Post('login')
  login(@Req() req: Request, @Res() res: Response) {
    const { username, password } = req.body;
    const result = this.service.login(username, password);
    if (result.success) {
      this.service.addSession(res, { username, password });
    }

    res.json(result);
  }

  @Post('register')
  register(@Req() req: Request, @Res() res: Response) {
    const { username, password } = req.body;
    const result = this.service.register(username, password);
    if (result.success) {
      this.service.addSession(res, { username, password });
    }

    res.json(result);
  }
}
