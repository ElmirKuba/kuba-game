/**
 * Основной разработчик ElmirKuba
 * Приложение: backend-часть проекта KubaGame
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

/**
 * Главная функция запуска NestJS приложения
 * @returns {Promise<void>}
 */
async function bootstrap() {
  /** Созданный экземпляр NestJS приложения */
  const app = await NestFactory.create(AppModule);

  /** Глобальный префикс REST-API */
  const globalPrefix = 'api';

  app.setGlobalPrefix(globalPrefix);

  /** Порт, который занимает REST-API */
  const port = process.env.PORT || 3000;

  await app.listen(port);

  Logger.log(
    `🚀 NestJS приложение запущено и слушает REST-API: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
