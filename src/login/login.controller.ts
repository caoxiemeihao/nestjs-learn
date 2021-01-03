import { Controller, Get, Render, Req } from '@nestjs/common';
import { Request } from 'express';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor(private loginService: LoginService) {}

  @Get()
  @Render('login')
  index(@Req() req: Request) {
    return this.loginService.tplData(req.cookies.sessionId);
  }
}
