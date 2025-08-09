import { Module } from '@nestjs/common';
import { AccountCreateModule } from './create/create.module';
import { AccountAuthModule } from './auth/auth.module';
import { AccountLogoutModule } from './logout/logout.module';
import { AccountReadModule } from './read/read.module';

/** Модуль системы аккаунтов */
@Module({
  imports: [
    AccountCreateModule,
    AccountAuthModule,
    AccountLogoutModule,
    AccountReadModule,
  ],
  exports: [],
  controllers: [],
  providers: [],
})
export class AccountLogicsModule {}
