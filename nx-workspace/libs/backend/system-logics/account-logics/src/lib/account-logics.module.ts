import { Module } from '@nestjs/common';
import { AccountCreateService } from './services/create.service';
import { OrmRepositoriesModule } from '@backend/orm-repositories';
import { AccountAuthService } from './services/auth.service';
import {
  CreateOrUpdateSessionModule,
  GenerateTokensModule,
} from '@backend/sessions-and-tokens';

/** Модель системы аккаунтов */
@Module({
  imports: [
    OrmRepositoriesModule,
    GenerateTokensModule,
    CreateOrUpdateSessionModule,
  ],
  exports: [AccountCreateService, AccountAuthService],
  controllers: [],
  providers: [AccountCreateService, AccountAuthService],
})
export class AccountLogicsModule {}
