import { Module } from '@nestjs/common';

/** Модуль всех REST-API эндпоинтов связанных с аккаунтами */
@Module({
  imports: [
    // AccountCreateModule,
    // AccountAuthModule,
    // AccountLogoutModule,
    // GuardsModule,
  ],
  exports: [],
  controllers: [
    // ApiCreateAccountController,
    // ApiAuthAccountController,
    // ApiLogoutAccountController,
  ],
  providers: [],
})
export class ApiAccountModule {}
