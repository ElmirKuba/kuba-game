import { Module } from '@nestjs/common';
import { AccountUseCaseModule } from './account/account.use-case.module';

/** Модуль всех модулей бизнес логики уровня UseCase */
@Module({
  imports: [AccountUseCaseModule],
  exports: [],
  controllers: [],
  providers: [],
})
export class AllUseCaseModule {}
