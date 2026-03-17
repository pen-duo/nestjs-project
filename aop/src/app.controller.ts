import { Controller, Get, Query, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { LoginGuard } from './login.guard';
import { TimeInterceptor } from './time.interceptor';
import { ValidatePipe } from './validate.pipe';
import { TestFilter } from './test.filter';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  // 路由 guard 守卫
  @UseGuards(LoginGuard)
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('login')
  @UseInterceptors(TimeInterceptor)
  login(): string {
    return 'login';
  }

  @Get('ccc')
  @UseFilters(TestFilter)
  ccc(@Query('num', ValidatePipe) num: number): string {
    return (num + 1).toString();
  }
}
