import { Module } from '@nestjs/common';
import { AccountCreateLoginService } from './services/create.service';
import { OrmRepositoriesModule } from '@backend/orm-repositories';

/** Модель системы аккаунтов */
@Module({
  imports: [OrmRepositoriesModule],
  exports: [AccountCreateLoginService],
  controllers: [],
  providers: [AccountCreateLoginService],
})
export class AccountLogicsModule {}
