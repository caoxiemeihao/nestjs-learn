import { Controller, Get } from '@nestjs/common';
import { LoginView } from 'src/views/login';

@Controller('login')
export class LoginController {

  constructor(
    private readonly loginView: LoginView,
  ) { }

  @Get()
  async index() {
    return (this.loginView.render() as any).html;
  }
}
