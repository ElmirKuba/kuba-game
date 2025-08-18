import { Module } from '@nestjs/common';
import { ApiLogoutAccountController } from './logout.controller';
import { AllUtilityLevelModule } from '../../../utility-level/all.utility-level.module';

/** Модуль REST-API связанного с функционалом выхода из аккаунта */
@Module({
  imports: [AllUtilityLevelModule],
  exports: [],
  controllers: [ApiLogoutAccountController],
  providers: [],
})
export class ApiLogoutAccountModule {}
