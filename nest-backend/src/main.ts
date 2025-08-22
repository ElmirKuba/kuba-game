import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import {
  ApiExceptionFilter,
  exceptionFactoryHandler,
} from './filters/http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PackageSourceInnerService } from './utility-level/package-source/package-source.utility.service';
import { ApiResultDto } from './dtos/output/api/api-result.dto';
import { AccountToUpdateDataDto } from './dtos/input/account/account-to-input-data.dto';

/** Глобальный префикс REST-API */
const globalPrefix = 'api';

/**
 * Функция настройки всего что связано со Swagger
 */
const swaggerSetupBeforeStartApp = (app: INestApplication<any>) => {
  /** Сам, непосредственно, экземпляр PackageSourceInnerService */
  const packageSourceInstance = PackageSourceInnerService.getInstance();
  /** Версия приложения */
  const versionApp = packageSourceInstance.getPackageByKey('version');
  /** URL веб-сайта разработчика */
  const websiteDeveloper =
    packageSourceInstance.getPackageByKey('websiteDeveloper');
  /** E-Mail разработчика */
  const emailDeveloper =
    packageSourceInstance.getPackageByKey('emailDeveloper');

  const configDoc = new DocumentBuilder()
    .setTitle('Nest.js Backend часть проекта KubaGame.')
    .setDescription(
      'Описание всех endpoints, с которыми можно взаимодействовать с Backend часть проекта, реализованной средствами Nest.js фреймворка',
    )
    .setVersion(versionApp as string)
    .setContact(
      'ElmirKuba Develop',
      websiteDeveloper as string,
      emailDeveloper as string,
    )
    // .addCookieAuth()
    .build();

  const swDocument = SwaggerModule.createDocument(app, configDoc, {
    deepScanRoutes: true,
    extraModels: [ApiResultDto, AccountToUpdateDataDto],
    ignoreGlobalPrefix: false,
  });
  SwaggerModule.setup(`/${globalPrefix}/docs`, app, swDocument);
};

/**
 * Главная функция запуска NestJS приложения
 *
 * ✅ Уже реализовано:
 * ✔ GET:    /api/system/dev/migrate                        - Запуск миграции в БД
 * ✔ POST:   /api/account/create                            - Создание аккаунта
 * ✔ POST:   /api/account/auth                              - Авторизация аккаунта
 * ✔ POST:   /api/account/logout                            - Выход из аккаунта
 * ✔ POST:   /api/session/refresh                           - Обновление AccessToken (если истёк)
 * ✔ GET:    /api/account/read                              - Чтение данных аккаунта по его ID (или своего без указания ID)
 * ✔ PATCH:  /api/account/update                            - Редактирование аккаунта (например: логин, пароль)
 * ✔ GET:    /api/session/read-list                         - Получение всех сессий текущего аккаунта
 * ✔ DELETE: /api/session/delete/:id                        - Удаление конкретной сессии по ID
 * ✔ POST:   /api/session/clear-others                      - Удаление всех сессий кроме текущей
 * ✔ WS:     ws://localhost:3001/socket-io-nest-backend     - WebSocket URL для соединения
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
  /** Порт, который занимает REST-API */
  const port = process.env.BACKEND_PORT_RESTAPI ?? 3000;

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
      }),
    )
    .useGlobalFilters(new ApiExceptionFilter(app.get(HttpAdapterHost)));

  swaggerSetupBeforeStartApp(app);

  await app.listen(port);

  Logger.log(
    `🚀 NestJS приложение запущено и слушает REST-API: http://localhost:${port}/${globalPrefix}`,
  );
}

void bootstrap();
