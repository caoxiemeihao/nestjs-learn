import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';

@Module({
  imports: [SharedModule],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule {}
