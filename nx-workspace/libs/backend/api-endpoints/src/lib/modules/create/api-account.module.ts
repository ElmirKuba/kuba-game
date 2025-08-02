import { Module } from '@nestjs/common';
import { ApiCreateAccountController } from './api-create-account.controller';
import { AccountLogicsModule } from '@backend/systems/account-logics';

/** Модуль всех REST-API эндпоинтов связанных с аккаунтами */
@Module({
  imports: [AccountLogicsModule],
  exports: [],
  controllers: [ApiCreateAccountController],
  providers: [],
})
export class ApiAccountModule {}
