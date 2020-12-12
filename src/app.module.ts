import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HomeController } from './controllers/home.controller';
import { LoginController } from './controllers/login.controller';
import { ViewModule } from './views/view.module';

@Module({
  imports: [
    ViewModule,
  ],
  controllers: [
    AppController,
    HomeController,
    LoginController,
  ],
  providers: [
    AppService,
  ],
})
export class AppModule {}
