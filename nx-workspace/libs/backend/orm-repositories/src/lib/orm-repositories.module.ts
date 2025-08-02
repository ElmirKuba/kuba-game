import { Module } from '@nestjs/common';
import { AccountsRepositoryService } from './repositories/accounts-repository.service';

/** Модуль все репозиториев управляющих данными средствами ORM в СуБД */
@Module({
  imports: [],
  exports: [AccountsRepositoryService],
  controllers: [],
  providers: [AccountsRepositoryService],
})
export class OrmRepositoriesModule {}
