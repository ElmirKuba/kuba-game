import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { Logger, ValidationPipe } from '@nestjs/common';
import {
  ApiExceptionFilter,
  exceptionFactoryHandler,
} from './filters/http-exception.filter';

/**
 * Главная функция запуска NestJS приложения
 *
 * ✅ Уже реализовано:
 * ✔ GET:    /api/system/dev/migrate    - Запуск миграции в БД
 * ✔ POST:   /api/account/create        - Создание аккаунта
 * ✔ POST:   /api/account/auth          - Авторизация аккаунта
 * ✔ POST:   /api/account/logout        - Выход из аккаунта
 * ✔ POST:   /api/session/refresh       - Обновление AccessToken (если истёк)
 * ✔ GET:    /api/account/read          - Чтение данных аккаунта по его ID (или своего без указания ID)
 * ✔ PATCH:  /api/account/update        - Редактирование аккаунта (например: логин, пароль)
 * ✔ GET:    /api/session/read-list     - Получение всех сессий текущего аккаунта
 *
 * TODO: ElmirKuba 2025-08-04: Реализовать апишки описанные ниже:
 * !5. DELETE: /api/session/:id          - Удаление конкретной сессии по ID
 * !6. POST:   /api/session/clear-others - Удаление всех сессий кроме текущей
 *
 * ! DELETE /api/session/:id
 * Только если session.account_id === currentAccount.id
 * Удаляет указанную сессию
 *
 * ! POST /api/session/clear-others
 * Удаляет все сессии, кроме текущей
 * Используется, когда пользователь выходит со всех устройств
 *
 * @returns {Promise<void>}
 */
async function bootstrap(): Promise<void> {
  /** Созданный экземпляр NestJS приложения */
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: '*',
      credentials: true,
      methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    },
  });

  /** Глобальный префикс REST-API */
  const globalPrefix = 'api';
  /** Порт, который занимает REST-API */
  const port = process.env.PORT ?? 3000;

  await app
    .setGlobalPrefix(globalPrefix)
    .use(cookieParser())
    .useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        stopAtFirstError: false,
        exceptionFactory: exceptionFactoryHandler,
      }),
    )
    .useGlobalFilters(new ApiExceptionFilter(app.get(HttpAdapterHost)))
    .listen(port);

  Logger.log(
    `🚀 NestJS приложение запущено и слушает REST-API: http://localhost:${port}/${globalPrefix}`,
  );
}

void bootstrap();
