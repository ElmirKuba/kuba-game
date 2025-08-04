import { Module } from '@nestjs/common';
import { RemoveTokensService } from './remove-session.service';
import { OrmRepositoriesModule } from '@backend/orm-repositories';

/** Модуль для работы с удалением сессии */
@Module({
  imports: [OrmRepositoriesModule],
  exports: [RemoveTokensService],
  controllers: [],
  providers: [RemoveTokensService],
})
export class RemoveTokensModule {}
