import { join } from 'path';
import { Injectable } from "@nestjs/common";
import { HtmlWrap_NJKrender, HtmlWrapResult } from '../components/html.wrap';

@Injectable()
export class HomeView {

  @HtmlWrap_NJKrender({
    head: `<title>{{ title }}</title>`,
    body: join(process.cwd(), 'src/views/home/index.njk')
  })
  render() {}
}
