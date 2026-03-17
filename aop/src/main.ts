import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NextFunction } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // global middleware
  app.use(function (req: Request, res: Response, next: NextFunction) {
    console.log('before middleware', req.url);
    next();
    console.log('after middleware');
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
