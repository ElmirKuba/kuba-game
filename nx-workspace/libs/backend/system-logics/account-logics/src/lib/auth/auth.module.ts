import { Module } from '@nestjs/common';
import { AccountAuthService } from './auth.service';
import {
  CreateOrUpdateSessionModule,
  GenerateTokensModule,
} from '@backend/sessions-and-tokens';
import { AccountAdapterModule } from '@backend/adapters-repos';

/** Модуль системы авторизации аккаунтов */
@Module({
  imports: [
    AccountAdapterModule,
    GenerateTokensModule,
    CreateOrUpdateSessionModule,
  ],
  exports: [AccountAuthService],
  controllers: [],
  providers: [AccountAuthService],
})
export class AccountAuthModule {}
