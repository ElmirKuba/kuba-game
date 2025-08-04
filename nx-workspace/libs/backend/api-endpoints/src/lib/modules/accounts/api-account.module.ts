import { Module } from '@nestjs/common';
import { ApiCreateAccountController } from './api-create-account.controller';
import { AccountLogicsModule } from '@backend/systems/account-logics';
import { ApiAuthAccountController } from './api-auth-account.controller';
import { ApiLogoutAccountController } from './api-logout-account.controller';
import { GuardsModule } from '@backend/guards';

/** Модуль всех REST-API эндпоинтов связанных с аккаунтами */
@Module({
  imports: [AccountLogicsModule, GuardsModule],
  exports: [],
  controllers: [
    ApiCreateAccountController,
    ApiAuthAccountController,
    ApiLogoutAccountController,
  ],
  providers: [],
})
export class ApiAccountModule {}
