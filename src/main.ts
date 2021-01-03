import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { join } from 'path';
import { configure } from 'nunjucks';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const express = app.getHttpAdapter().getInstance();

  app.use(cookieParser()); // 解析 cookie

  const assets = join(__dirname, '..', 'public'); // 静态文件目录
  const views = join(__dirname, '..', 'views'); // 模板目录

  configure(views, {
    express,
    watch: true, // 只在开发模式下打开；怎样实现好呢？
  });

  app.useStaticAssets(assets); // 设置静态文件目录
  app.setBaseViewsDir(views); // 设计模板目录
  app.set('view engine', 'njk'); // 设置模板引擎

  await app.listen(3000);
}
bootstrap();
