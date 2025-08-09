import { OrmRepositoriesModule } from '@backend/orm-repositories';
import { Module } from '@nestjs/common';
import { SessionAdapterService } from './session-adapter.service';

/** Модуль адаптера репозитория для сессий */
@Module({
  imports: [OrmRepositoriesModule],
  exports: [SessionAdapterService],
  controllers: [],
  providers: [SessionAdapterService],
})
export class SessionAdapterModule {}
