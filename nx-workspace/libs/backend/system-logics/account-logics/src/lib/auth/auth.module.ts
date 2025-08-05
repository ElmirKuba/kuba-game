import { Module } from '@nestjs/common';
import { OrmRepositoriesModule } from '@backend/orm-repositories';
import { AccountAuthService } from './auth.service';
import {
  CreateOrUpdateSessionModule,
  GenerateTokensModule,
} from '@backend/sessions-and-tokens';

/** Модуль системы авторизации аккаунтов */
@Module({
  imports: [
    OrmRepositoriesModule,
    GenerateTokensModule,
    CreateOrUpdateSessionModule,
  ],
  exports: [AccountAuthService],
  controllers: [],
  providers: [AccountAuthService],
})
export class AccountAuthModule {}
