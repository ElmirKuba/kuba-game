import { Module } from '@nestjs/common';
import { ApiRefreshAccountModule } from './refresh/refresh.module';

/** Модуль всех REST-API эндпоинтов связанных с сессиями */
@Module({
  imports: [ApiRefreshAccountModule],
  exports: [],
  controllers: [],
  providers: [],
})
export class ApiSessionModule {}
