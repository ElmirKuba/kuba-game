import { Module } from '@nestjs/common';
import { ApiDeleteSessionsController } from './delete.controller';
import { AllUtilityLevelModule } from '../../../utility-level/all.utility-level.module';
import { SessionDeleteUseCaseModule } from '../../../use-cases-level/session/delete/delete.use-case.module';

/** Модуль REST-API связанного с функционалом удаления других своих сессий */
@Module({
  imports: [AllUtilityLevelModule, SessionDeleteUseCaseModule],
  exports: [],
  controllers: [ApiDeleteSessionsController],
  providers: [],
})
export class ApiDeleteSessionsModule {}
