import { Controller, Get, Post, Render, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor(private loginService: LoginService) {}

  @Get()
  @Render('login')
  index(@Req() req: Request) {
    return this.loginService.renderData(req.cookies.sessionId);
  }

  @Post('login')
  login(@Req() req: Request, @Res() res: Response) {
    res.json({ a: 12, b: 5, c: Math.random() });
  }

  @Post('register')
  register(@Req() req: Request, @Res() res: Response) {
    const { username, password } = req.body;
    const result = this.loginService.register(username, password);
    if (result.success) this.loginService.updateSessionId(res, { username, password });

    res.json(result);
  }
}
