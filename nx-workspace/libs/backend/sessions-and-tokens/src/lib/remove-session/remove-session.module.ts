import { Module } from '@nestjs/common';
import { RemoveSessionService } from './remove-session.service';
import { OrmRepositoriesModule } from '@backend/orm-repositories';

/** Модуль для работы с удалением сессии */
@Module({
  imports: [OrmRepositoriesModule],
  exports: [RemoveSessionService],
  controllers: [],
  providers: [RemoveSessionService],
})
export class RemoveTokensModule {}
