/* eslint-disable prettier/prettier */
import { join } from 'path'
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NunjucksModule } from './nunjucks';
import { HomeModule } from './home/home.module';
import { LoginModule } from './login/login.module';

@Module({
  imports: [
    // 20-12-31 这个目前还用不起来
    NunjucksModule.forRoot({
      paths: [join(__dirname, '../views')],
      options: {},
    }),
    HomeModule,
    LoginModule,
  ],
  controllers: [
    AppController,
  ],
  providers: [
    AppService
  ],
})
export class AppModule { }
