import { ConfigureOptions } from 'nunjucks';

export interface NunjucksModuleOptions {
  paths: Array<string>;
  options?: ConfigureOptions;
}
