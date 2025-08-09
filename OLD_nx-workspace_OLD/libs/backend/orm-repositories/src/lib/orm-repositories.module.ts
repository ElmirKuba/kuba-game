import { Module } from '@nestjs/common';
import { AccountsRepositoryService } from './repositories/accounts-repository.service';
import { SessionsRepositoryService } from './repositories/sessions-repository.service';

/** Модуль все репозиториев управляющих данными средствами ORM в СуБД */
@Module({
  imports: [],
  exports: [AccountsRepositoryService, SessionsRepositoryService],
  controllers: [],
  providers: [AccountsRepositoryService, SessionsRepositoryService],
})
export class OrmRepositoriesModule {}
