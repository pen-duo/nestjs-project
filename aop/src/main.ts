import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NextFunction } from 'express';
import { LoginGuard } from './login.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // global middleware
  app.use(function (req: Request, res: Response, next: NextFunction) {
    console.log('before middleware', req.url);
    next();
    console.log('after middleware');
  });

  // 全局守卫 guard
  app.useGlobalGuards(new LoginGuard());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
