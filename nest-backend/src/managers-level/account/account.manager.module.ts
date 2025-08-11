import { Module } from '@nestjs/common';
import { AccountReadManagerModule } from './read/account-read.manager.module';

/** Модуль всех модулей бизнес логики уровня Manager связанных с аккаунтами */
@Module({
  imports: [AccountReadManagerModule],
  exports: [],
  controllers: [],
  providers: [],
})
export class AccountManagerModule {}
