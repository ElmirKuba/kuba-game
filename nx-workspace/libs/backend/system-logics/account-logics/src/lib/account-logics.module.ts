import { Module } from '@nestjs/common';
import { AccountCreateService } from './services/create.service';
import { OrmRepositoriesModule } from '@backend/orm-repositories';
import { AccountAuthService } from './services/auth.service';
import {
  CreateOrUpdateSessionModule,
  GenerateTokensModule,
  RemoveTokensModule,
} from '@backend/sessions-and-tokens';
import { AccountLogoutService } from './services/logout.service';
import { AccountReadService } from './services/read.service';

/** Модуль системы аккаунтов */
@Module({
  imports: [
    OrmRepositoriesModule,
    GenerateTokensModule,
    CreateOrUpdateSessionModule,
    RemoveTokensModule,
  ],
  exports: [
    AccountCreateService,
    AccountAuthService,
    AccountLogoutService,
    AccountReadService,
  ],
  controllers: [],
  providers: [
    AccountCreateService,
    AccountAuthService,
    AccountLogoutService,
    AccountReadService,
  ],
})
export class AccountLogicsModule {}
