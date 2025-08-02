import { Module } from '@nestjs/common';
import { ApiCreateAccountController } from './api-create-account.controller';
import { AccountLogicsModule } from '@backend/systems/account-logics';
import { ApiAuthAccountController } from './api-auth-account.controller';

/** Модуль всех REST-API эндпоинтов связанных с аккаунтами */
@Module({
  imports: [AccountLogicsModule],
  exports: [],
  controllers: [ApiCreateAccountController, ApiAuthAccountController],
  providers: [],
})
export class ApiAccountModule {}
