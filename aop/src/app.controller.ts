import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { LoginGuard } from './login.guard';

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
  login(): string {
    return 'login';
  }
}
