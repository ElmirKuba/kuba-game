import { Module } from '@nestjs/common';
import { AccountDrizzleRepositoryModule } from './account/account.drizzle-repository.module';

/** Модуль всех модулей-репозиториев для работы данными через схемы */
@Module({
  imports: [AccountDrizzleRepositoryModule],
  exports: [],
  controllers: [],
  providers: [],
})
export class AllDrizzleRepositoriesModule {}
