import { Module } from '@nestjs/common';
import { AccountCreateUseCaseService } from './account-create.use-case.service';
import { AccountReadManagerModule } from '../../../managers-level/account/read/account-read.manager.module';

/** Модуль бизнес логики уровня UseCase создания аккаунта */
@Module({
  imports: [AccountReadManagerModule],
  exports: [AccountCreateUseCaseService],
  controllers: [],
  providers: [AccountCreateUseCaseService],
})
export class AccountCreateUseCaseModule {}
