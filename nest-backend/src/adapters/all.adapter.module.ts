import { Module } from '@nestjs/common';
import { AccountAdapterModule } from './account/account.adapter.module';

/** Модуль всех модулей-адаптеров для работы с репозиториями данных */
@Module({
  imports: [AccountAdapterModule],
  exports: [],
  controllers: [],
  providers: [],
})
export class AllAdaptersModule {}
