import { Controller, Get, Render, Req, UseInterceptors } from '@nestjs/common';
import { Request } from 'express';
import { LoginInterceptor } from 'src/shared/login.interceptor';
import { HomeService } from './home.service';

@UseInterceptors(LoginInterceptor)
@Controller('home')
export class HomeController {
  constructor(private service: HomeService) {}

  @Get()
  @Render('home')
  index(@Req() req: Request) {
    return this.service.renderData(req);
  }
}
