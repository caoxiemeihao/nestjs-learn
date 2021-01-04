import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';
import { HomeController } from './home.controller';
import { HomeService } from './home.service';

@Module({
  imports: [SharedModule],
  controllers: [HomeController],
  providers: [HomeService],
})
export class HomeModule {}
