import { Module } from '@nestjs/common';
import { AccountCreateService } from './create.service';
import { OrmRepositoriesModule } from '@backend/orm-repositories';

/** Модуль системы создания аккаунтов */
@Module({
  imports: [OrmRepositoriesModule],
  exports: [AccountCreateService],
  controllers: [],
  providers: [AccountCreateService],
})
export class AccountCreateModule {}
