import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

/** Главная функция, выполняющая старт всего приложения */
async function bootstrap() {
  /** Экземляр приложения */
  const app = await NestFactory.create(AppModule);

  /** Глобальный префикс для REST API создаваемый приложением */
  const globalPrefix = 'api';

  app.setGlobalPrefix(globalPrefix);

  /** Порт приложения */
  const port = process.env.PORT || 3000;

  await app.listen(port);

  Logger.log(
    `🚀 Nest Backend для проекта KubaGame запущен и слушает: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
