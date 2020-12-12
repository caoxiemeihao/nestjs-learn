import { Controller, Get } from "@nestjs/common";
import { HtmlWrapResult } from "src/views/components/html.wrap";
import { HomeView } from "src/views/home";

@Controller('home')
export class HomeController {

  constructor(
    private readonly homeView: HomeView,
  ) { }

  @Get()
  async index() {
    return ((this.homeView.render() as any) as HtmlWrapResult).html;
  }
}
