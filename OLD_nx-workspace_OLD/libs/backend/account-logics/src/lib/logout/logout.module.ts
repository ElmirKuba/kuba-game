import { Module } from '@nestjs/common';
import { AccountLogoutService } from './logout.service';
import { RemoveTokensModule } from '@backend/sessions-and-tokens';

/** Модуль системы выхода из аккаунтов */
@Module({
  imports: [RemoveTokensModule],
  exports: [AccountLogoutService],
  controllers: [],
  providers: [AccountLogoutService],
})
export class AccountLogoutModule {}
