import { Injectable } from '@nestjs/common';

@Injectable()
export class LoginService {
  tplData() {
    return { message: 'login.service.LoginService' };
  }
}
