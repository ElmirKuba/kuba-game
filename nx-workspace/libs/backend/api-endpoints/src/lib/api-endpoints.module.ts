import { Module } from '@nestjs/common';
import { ApiAccountModule } from './modules/accounts/api-account.module';

/** Модуль всех REST-API эндпоинтов */
@Module({
  imports: [ApiAccountModule],
  exports: [],
  controllers: [],
  providers: [],
})
export class ApiEndpointsModule {}
