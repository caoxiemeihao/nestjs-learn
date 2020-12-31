import { Injectable } from '@nestjs/common';

@Injectable()
export class HomeService {
  data() {
    return { message: 'home.service.HomerSerivce' };
  }
}
