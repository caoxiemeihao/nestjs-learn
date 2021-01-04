import { Injectable } from '@nestjs/common';

@Injectable()
export class HomeService {
  renderData() {
    return { name: 'home.service.HomerSerivce' };
  }
}
