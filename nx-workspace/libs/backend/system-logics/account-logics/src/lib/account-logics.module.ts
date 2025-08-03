import { Module } from '@nestjs/common';
import { AccountCreateService } from './services/create.service';
import { OrmRepositoriesModule } from '@backend/orm-repositories';
import { AccountAuthService } from './services/auth.service';
import {
  CreateOrUpdateSessionModule,
  GenerateTokensModule,
} from '@backend/sessions-and-tokens';
import { AccountLogoutService } from './services/logout.service';

/** Модель системы аккаунтов */
@Module({
  imports: [
    OrmRepositoriesModule,
    GenerateTokensModule,
    CreateOrUpdateSessionModule,
  ],
  exports: [AccountCreateService, AccountAuthService, AccountLogoutService],
  controllers: [],
  providers: [AccountCreateService, AccountAuthService, AccountLogoutService],
})
export class AccountLogicsModule {}
