import { Module } from '@nestjs/common';
import { ApiReadAccountController } from './read.controller';
import { AllUtilityLevelModule } from '../../../utility-level/all.utility-level.module';
import { AccountReadUseCaseModule } from '../../../use-cases-level/account/read/read.use-case.module';

/** Модуль REST-API связанный с функционалом чтения аккаунта */
@Module({
  imports: [AllUtilityLevelModule, AccountReadUseCaseModule],
  exports: [],
  controllers: [ApiReadAccountController],
  providers: [],
})
export class ApiReadAccountModule {}
