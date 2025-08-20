import { Module } from '@nestjs/common';
import { AllUtilityLevelModule } from '../../../utility-level/all.utility-level.module';
import { ApiReadSessionController } from './read.controller';

/** Модуль REST-API контроллера связанного с функционалом чтения сессий */
@Module({
  imports: [AllUtilityLevelModule],
  exports: [],
  controllers: [ApiReadSessionController],
  providers: [],
})
export class ApiReadSessionModule {}
