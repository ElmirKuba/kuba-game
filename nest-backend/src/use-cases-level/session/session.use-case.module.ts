import { Module } from '@nestjs/common';
import { SessionRefreshUseCaseModule } from './refresh/refresh.use-case.module';
import { SessionReadUseCaseModule } from './read/read.use-case.module';

/** Модуль всех модулей бизнес логики уровня UseCase связанных с сессиями */
@Module({
  imports: [SessionRefreshUseCaseModule, SessionReadUseCaseModule],
  exports: [],
  controllers: [],
  providers: [],
})
export class SessionUseCaseModule {}
