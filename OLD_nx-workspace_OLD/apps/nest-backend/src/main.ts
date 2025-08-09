/**
 * Основной разработчик ElmirKuba
 * Приложение: backend-часть проекта KubaGame
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ApiExceptionFilter, exceptionFactoryHandler } from '@backend/filters';
import cookieParser from 'cookie-parser';

/**
 * Главная функция запуска NestJS приложения
 *
 * ✅ Уже реализовано:
 * ✔ GET:    /api/system/dev/migrate    - Запуск миграции в БД
 * ✔ POST:   /api/account/create        - Создание аккаунта
 * ✔ POST:   /api/account/auth          - Авторизация аккаунта
 * ✔ POST:   /api/account/logout        - Выход из аккаунта
 *
 * TODO: ElmirKuba 2025-08-04: Реализовать апишки описанные ниже:
 * !0. POST:   /api/session/refresh      - Обновление AccessToken (если истёк)
 * !1. PATCH:  /api/account/edit         - Редактирование аккаунта (например: логин, пароль)
 * !2. DELETE: /api/account/remove       - Удаление аккаунта (и всех сессий)
 * !3. GET:    /api/session/list         - Получение всех сессий текущего аккаунта
 * !4. DELETE: /api/session/:id          - Удаление конкретной сессии по ID
 * !5. POST:   /api/session/clear-others - Удаление всех сессий кроме текущей
 *
 * 🛠 Подробности по новым эндпоинтам
 * ! PATCH /api/account/edit
 * Редактировать можно:
 * - login (уникальность проверить)
 * - пароль (с хешированием)
 *
 * ! DELETE /api/account/remove
 * Удаляет аккаунт
 * Удаляет все его сессии
 *
 * ! GET /api/session/list
 * Возвращает массив { id, ip, ua, osData, createdAt? }
 * Используется в личном кабинете
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
async function bootstrap() {
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

  app
    .setGlobalPrefix(globalPrefix)
    .use(cookieParser())
    .useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        stopAtFirstError: false,
        exceptionFactory: exceptionFactoryHandler,
      })
    )
    .useGlobalFilters(new ApiExceptionFilter(app.get(HttpAdapterHost)));

  /** Порт, который занимает REST-API */
  const port = process.env.PORT || 3000;

  await app.listen(port);

  Logger.log(
    `🚀 NestJS приложение запущено и слушает REST-API: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
