import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  @Inject(AppService)
  private readonly appService: AppService;

  @Inject('app_service_1')
  private readonly appService1: AppService;

  @Inject('app_service_2')
  private readonly appService2: { name: string; age: number };

  @Inject('app_service_3')
  private readonly appService3: { name: string; age: number };

  @Inject('app_service_4')
  private readonly appService4: { name: string; age: number };

  @Inject('app_service_5')
  private readonly appService5: {
    name: string;
    age: number;
    appService: string;
  };

  @Inject('app_service_6')
  private readonly appService6: AppService;

  @Get()
  getHello(): string {
    console.log(this.appService);
    console.log(this.appService1);
    console.log(this.appService2);
    console.log(this.appService3);
    console.log(this.appService4);
    console.log(this.appService5);
    console.log(this.appService6);
    return 'Hello World!';
  }
}
