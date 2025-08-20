import { Module } from '@nestjs/common';
import { ApiUpdateAccountController } from './update.controller';
import { AllUtilityLevelModule } from '../../../utility-level/all.utility-level.module';
import { AccountUpdateUseCaseModule } from '../../../use-cases-level/account/update/update.use-case.module';

/** Модуль REST-API связанный с функционалом обновления данных аккаунта */
@Module({
  imports: [AllUtilityLevelModule, AccountUpdateUseCaseModule],
  exports: [],
  controllers: [ApiUpdateAccountController],
  providers: [],
})
export class ApiUpdateAccountModule {}
