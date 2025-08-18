import { Module } from '@nestjs/common';
import { ApiLogoutAccountController } from './logout.controller';
import { AllUtilityLevelModule } from '../../../utility-level/all.utility-level.module';
import { AccountLogoutUseCaseModule } from '../../../use-cases-level/account/logout/logout.use-case.module';

/** Модуль REST-API связанного с функционалом выхода из аккаунта */
@Module({
  imports: [AllUtilityLevelModule, AccountLogoutUseCaseModule],
  exports: [],
  controllers: [ApiLogoutAccountController],
  providers: [],
})
export class ApiLogoutAccountModule {}
