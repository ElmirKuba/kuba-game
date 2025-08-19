import { Module } from '@nestjs/common';
import { SessionRefreshUseCaseModule } from './refresh/refresh.use-case.module';

/** Модуль всех модулей бизнес логики уровня UseCase связанных с сессиями */
@Module({
  imports: [SessionRefreshUseCaseModule],
  exports: [],
  controllers: [],
  providers: [],
})
export class SessionUseCaseModule {}
