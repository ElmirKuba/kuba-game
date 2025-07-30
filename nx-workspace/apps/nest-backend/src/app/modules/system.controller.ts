import { Controller, Get, UsePipes, ValidationPipe } from '@nestjs/common';
import { SystemService } from './system.service';

/** Основной REST-API контроллер системного модуля приложения NestJS */
@Controller('system')
export class SystemController {
  /**
   * Конструктор контроллера системы
   * @param systemService - Экземпляр основного сервиса системы
   */
  constructor(private systemService: SystemService) {}

  /**
   * Системное API запуска миграции в базу данных
   * @returns {string[]} - Результат миграции схем в базу данных
   * */
  @Get('dev/migrate')
  @UsePipes(
    new ValidationPipe({
      transform: true,
      skipUndefinedProperties: false,
      stopAtFirstError: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  )
  devMigrate(): string[] {
    const resultMigrateMessages = this.systemService.devMigrate();

    return resultMigrateMessages;
  }
}
