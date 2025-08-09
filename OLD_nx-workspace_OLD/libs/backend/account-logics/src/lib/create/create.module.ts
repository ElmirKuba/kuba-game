import { Module } from '@nestjs/common';
import { AccountCreateService } from './create.service';
import { AccountAdapterModule } from '@backend/adapters-repos';

/** Модуль системы создания аккаунтов */
@Module({
  imports: [AccountAdapterModule],
  exports: [AccountCreateService],
  controllers: [],
  providers: [AccountCreateService],
})
export class AccountCreateModule {}
