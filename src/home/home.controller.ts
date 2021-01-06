import { Controller, Get, Render, Req, UseInterceptors } from '@nestjs/common';
import { Request } from 'express';
import { User } from 'src/interface/user';
import { SessionUser } from 'src/shared/decorators';
import { LoginInterceptor } from 'src/shared/login.interceptor';
import { HomeService } from './home.service';

@UseInterceptors(LoginInterceptor)
@Controller('home')
export class HomeController {
  constructor(private service: HomeService) {}

  @Get()
  @Render('home')
  index(@Req() req: Request, @SessionUser() user: User) {
    return {
      ...this.service.renderData(req),
      user,
    };
  }
}
