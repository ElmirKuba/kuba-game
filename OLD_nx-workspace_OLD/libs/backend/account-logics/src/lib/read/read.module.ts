import { OrmRepositoriesModule } from '@backend/orm-repositories';
import { Module } from '@nestjs/common';
import { AccountReadService } from './read.service';

/** Модуль системы чтения аккаунтов */
@Module({
  imports: [OrmRepositoriesModule],
  exports: [AccountReadService],
  controllers: [],
  providers: [AccountReadService],
})
export class AccountReadModule {}
