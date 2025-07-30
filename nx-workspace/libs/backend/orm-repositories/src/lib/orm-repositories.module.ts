import { Module } from '@nestjs/common';
import { AccountsRepositoryService } from './repositories/accounts-repository.service';

@Module({
  imports: [],
  exports: [],
  controllers: [],
  providers: [AccountsRepositoryService],
})
export class OrmRepositoriesModule {}
