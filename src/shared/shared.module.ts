import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { UserService } from './user.service';

@Module({
  providers: [SessionService, UserService],
  // 必须导出
  exports: [SessionService, UserService],
})
export class SharedModule {}
