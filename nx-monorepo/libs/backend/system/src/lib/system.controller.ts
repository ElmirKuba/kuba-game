import { Controller, Get, UsePipes, ValidationPipe } from '@nestjs/common';
import { SystemService } from './system.service';

/** Контроллер API системы */
@Controller('system')
export class SystemController {
  constructor(private systemService: SystemService) {}

  /** Системное API запуска миграции в базу данных */
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
