import { Injectable, UseGuards } from '@nestjs/common';

@UseGuards()
@Injectable()
export class HomeService {
  tplData() {
    return { message: 'home.service.HomerSerivce' };
  }
}
