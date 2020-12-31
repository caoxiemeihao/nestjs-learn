import {
  Injectable,
  Inject,
  UseGuards,
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import { Environment, configure } from 'nunjucks';
import { NunjucksModuleOptions } from './interface';
import { NUNJUCKS_INJECT_TOKEN } from './constant';
import { join } from 'path';
import { Observable } from 'rxjs';

@UseGuards(
  class {
    canActivate(
      context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
      console.log(context);
      // 不执行
      return true;
    }
  },
)
@Injectable()
export class NunjucksService {
  env: Environment;

  constructor(
    @Inject(NUNJUCKS_INJECT_TOKEN) private optios: NunjucksModuleOptions,
    private app: ExpressAdapter,
  ) {
    const express = this.app.getInstance<ExpressAdapter>();

    // 配置 nunjucks
    this.env = configure(this.optios.paths, {
      ...this.optios.options,
      express,
    });

    const assets = join(__dirname, '../../public'); // 静态文件目录
    const views = join(__dirname, '../../views'); // 模板路径

    this.app.useStaticAssets(assets, {});
    this.app.setBaseViewsDir(views); // 设计模板路径
    this.app.set('view engine', 'njk'); // 设置模板引擎
  }
}
