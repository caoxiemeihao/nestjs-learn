import { Injectable } from '@nestjs/common';

@Injectable()
export class HomeService {
  tplData() {
    return { message: 'home.service.HomerSerivce' };
  }
}
