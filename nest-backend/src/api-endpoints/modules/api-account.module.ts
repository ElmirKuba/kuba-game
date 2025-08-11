import { Module } from '@nestjs/common';
import { ApiCreateAccountModule } from './create/api-create-account.module';

/** Модуль всех REST-API эндпоинтов связанных с аккаунтами */
@Module({
  imports: [ApiCreateAccountModule],
  exports: [],
  controllers: [],
  providers: [],
})
export class ApiAccountModule {}
