import { Module, DynamicModule } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import { NunjucksService } from './nunjucks.service';
import { NUNJUCKS_INJECT_TOKEN } from './constant';
import { NunjucksModuleOptions } from './interface';

@Module({
  providers: [ExpressAdapter],
})
export class NunjucksModule {
  static forRoot(opt: NunjucksModuleOptions): DynamicModule {
    return {
      module: NunjucksModule,
      providers: [
        {
          provide: NUNJUCKS_INJECT_TOKEN,
          useValue: opt,
        },
        NunjucksService, // 这里视作调用了 NunjucksService
      ],
      exports: [NunjucksService],
    };
  }
}
