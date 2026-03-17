import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NextFunction } from 'express';
import { LoginGuard } from './login.guard';
import { TimeInterceptor } from './time.interceptor';
import { ValidatePipe } from './validate.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // global middleware
  app.use(function (req: Request, res: Response, next: NextFunction) {
    console.log('before middleware', req.url);
    next();
    console.log('after middleware');
  });

  // 全局守卫：已用 APP_GUARD 在 AppModule 中注册，此处不再重复
  // app.useGlobalGuards(new LoginGuard());

  // 全局拦截器
  // app.useGlobalInterceptors(new TimeInterceptor());

  // 全局管道 参数验证
  app.useGlobalPipes(new ValidatePipe());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
