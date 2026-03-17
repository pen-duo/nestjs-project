import { Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { LoginGuard } from './login.guard';
import { TimeInterceptor } from './time.interceptor';

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
}
