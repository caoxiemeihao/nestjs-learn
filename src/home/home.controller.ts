import { Controller, Get, Render, UseInterceptors } from '@nestjs/common';
import { LoginInterceptor } from 'src/shared/login.interceptor';
import { HomeService } from './home.service';

@UseInterceptors(LoginInterceptor)
@Controller('home')
export class HomeController {
  constructor(private homeService: HomeService) {}

  @Get()
  @Render('home')
  index() {
    return this.homeService.renderData();
  }
}
