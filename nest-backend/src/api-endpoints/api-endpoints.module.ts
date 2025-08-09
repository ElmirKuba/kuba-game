import { Module } from '@nestjs/common';
import { ApiAccountModule } from './modules/api-account.module';

/** Модуль всех REST-API эндпоинтов */
@Module({
  // imports: [ApiAccountModule, ApiSessionModule],
  imports: [ApiAccountModule],
  exports: [],
  controllers: [],
  providers: [],
})
export class ApiEndpointsModule {}
