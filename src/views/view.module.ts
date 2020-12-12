import { Module } from '@nestjs/common';
import { HomeView } from './home';
import { LoginView } from './login';

@Module({
  imports: [],
  providers: [
    HomeView,
    LoginView,
  ],
  exports: [
    HomeView,
    LoginView,
  ],
})
export class ViewModule {}