import { join } from 'path';
import { Injectable } from "@nestjs/common";
import { HtmlWrap_NJKrender, HtmlWrapResult } from '../components/html.wrap';

@Injectable()
export class LoginView {

  @HtmlWrap_NJKrender({
    body: join(process.cwd(), 'src/views/login/index.njk')
  })
  render() {}
}
