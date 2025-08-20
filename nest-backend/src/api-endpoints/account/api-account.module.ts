import { Module } from '@nestjs/common';
import { ApiCreateAccountModule } from './create/api-create-account.module';
import { ApiAuthAccountModule } from './auth/api-auth-account.module';
import { ApiLogoutAccountModule } from './logout/logout.module';
import { ApiReadAccountModule } from './read/read.module';

/** Модуль всех REST-API эндпоинтов связанных с аккаунтами */
@Module({
  imports: [
    ApiCreateAccountModule,
    ApiAuthAccountModule,
    ApiLogoutAccountModule,
    ApiReadAccountModule,
  ],
  exports: [],
  controllers: [],
  providers: [],
})
export class ApiAccountModule {}
