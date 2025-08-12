import { Module } from '@nestjs/common';
import { ApiCreateAccountModule } from './create/api-create-account.module';
import { ApiAuthAccountModule } from './auth/api-auth-account.module';

/** Модуль всех REST-API эндпоинтов связанных с аккаунтами */
@Module({
  imports: [ApiCreateAccountModule, ApiAuthAccountModule],
  exports: [],
  controllers: [],
  providers: [],
})
export class ApiAccountModule {}
