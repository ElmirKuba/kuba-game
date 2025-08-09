import { Module } from '@nestjs/common';
import { CreateOrUpdateSessionService } from './create-session.service';
import { SessionAdapterModule } from '@backend/adapters-repos';

/** Модуль создания сессии */
@Module({
  imports: [SessionAdapterModule],
  exports: [CreateOrUpdateSessionService],
  controllers: [],
  providers: [CreateOrUpdateSessionService],
})
export class CreateOrUpdateSessionModule {}
