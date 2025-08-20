import { Module } from '@nestjs/common';
import { ApiRefreshSessionModule } from './refresh/refresh.module';
import { ApiReadSessionModule } from './read/read.module';

/** Модуль всех REST-API эндпоинтов связанных с сессиями */
@Module({
  imports: [ApiRefreshSessionModule, ApiReadSessionModule],
  exports: [],
  controllers: [],
  providers: [],
})
export class ApiSessionModule {}
