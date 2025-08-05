import { Module } from '@nestjs/common';
import { ApiCreateAccountController } from './controllers/api-create-account.controller';
import { AccountCreateModule } from '@backend/systems/account-logics';
import { ApiAuthAccountController } from './api-auth-account.controller';
import { ApiLogoutAccountController } from './api-logout-account.controller';
import { GuardsModule } from '@backend/guards';
import { AccountAuthModule } from '@backend/systems/account-logics';
import { AccountLogoutModule } from '@backend/systems/account-logics';

/** Модуль всех REST-API эндпоинтов связанных с аккаунтами */
@Module({
  imports: [
    AccountCreateModule,
    AccountAuthModule,
    AccountLogoutModule,
    GuardsModule,
  ],
  exports: [],
  controllers: [
    ApiCreateAccountController,
    ApiAuthAccountController,
    ApiLogoutAccountController,
  ],
  providers: [],
})
export class ApiAccountModule {}
