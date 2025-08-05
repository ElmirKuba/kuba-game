import { Module } from '@nestjs/common';
import { ApiAccountModule } from './modules/accounts/api-account.module';
import { ApiSessionModule } from './modules/sessions/api-session.module';

/** Модуль всех REST-API эндпоинтов */
@Module({
  imports: [ApiAccountModule, ApiSessionModule],
  exports: [],
  controllers: [],
  providers: [],
})
export class ApiEndpointsModule {}
