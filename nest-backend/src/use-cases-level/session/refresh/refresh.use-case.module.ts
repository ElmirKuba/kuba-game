import { Module } from '@nestjs/common';
import { SessionRefreshUseCaseService } from './refresh.use-case.service';

/** Модуль бизнес логики уровня UseCase обновления сессии */
@Module({
  imports: [],
  exports: [SessionRefreshUseCaseService],
  controllers: [],
  providers: [SessionRefreshUseCaseService],
})
export class SessionRefreshUseCaseModule {}
