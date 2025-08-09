import { Module } from '@nestjs/common';
import { AccountAdapterService } from './account-adapter.service';
import { OrmRepositoriesModule } from '@backend/orm-repositories';

/** Модуль адаптера репозитория для аккаунтов */
@Module({
  imports: [OrmRepositoriesModule],
  exports: [AccountAdapterService],
  controllers: [],
  providers: [AccountAdapterService],
})
export class AccountAdapterModule {}
