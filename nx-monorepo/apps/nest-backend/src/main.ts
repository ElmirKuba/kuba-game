import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const globalPrefix = 'api';

  app.setGlobalPrefix(globalPrefix);

  const port = process.env.PORT || 3000;

  await app.listen(port);

  Logger.log(
    `🚀 Nest Backend запущен и слушает: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
