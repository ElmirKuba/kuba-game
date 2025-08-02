import { Module } from '@nestjs/common';
import { AccountCreateService } from './services/create.service';
import { OrmRepositoriesModule } from '@backend/orm-repositories';
import { AccountAuthService } from './services/auth.service';
import { SystemsGenerateTokenModule } from '@backend/token';

/** Модель системы аккаунтов */
@Module({
  imports: [OrmRepositoriesModule, SystemsGenerateTokenModule],
  exports: [AccountCreateService, AccountAuthService],
  controllers: [],
  providers: [AccountCreateService, AccountAuthService],
})
export class AccountLogicsModule {}
