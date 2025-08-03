import { Module } from '@nestjs/common';
import { CreateOrUpdateSessionService } from './create-session.service';
import { OrmRepositoriesModule } from '@backend/orm-repositories';

/** Модуль создания сессии */
@Module({
  imports: [OrmRepositoriesModule],
  exports: [CreateOrUpdateSessionService],
  controllers: [],
  providers: [CreateOrUpdateSessionService],
})
export class CreateOrUpdateSessionModule {}
