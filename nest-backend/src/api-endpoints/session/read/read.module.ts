import { Module } from '@nestjs/common';
import { AllUtilityLevelModule } from '../../../utility-level/all.utility-level.module';
import { ApiReadSessionController } from './read.controller';
import { SessionReadUseCaseModule } from '../../../use-cases-level/session/read/read.use-case.module';

/** Модуль REST-API контроллера связанного с функционалом чтения сессий */
@Module({
  imports: [AllUtilityLevelModule, SessionReadUseCaseModule],
  exports: [],
  controllers: [ApiReadSessionController],
  providers: [],
})
export class ApiReadSessionModule {}
