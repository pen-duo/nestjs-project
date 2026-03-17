import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './logger.middleware';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { LoginGuard } from './login.guard';
import { TimeInterceptor } from './time.interceptor';
import { ValidatePipe } from './validate.pipe';
import { TestFilter } from './test.filter';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    //   {
    //   provide: APP_GUARD,
    //   useClass: LoginGuard,
    // }
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: TimeInterceptor,
    // }
    // {
    //   provide: APP_PIPE,
    //   useClass: ValidatePipe,
    // }
    {
      provide: APP_FILTER,
      useClass: TestFilter,
    }
  ],
})

// 路由中间件
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
