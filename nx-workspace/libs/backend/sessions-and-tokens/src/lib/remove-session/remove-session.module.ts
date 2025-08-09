import { Module } from '@nestjs/common';
import { RemoveSessionService } from './remove-session.service';
import { SessionAdapterModule } from '@backend/adapters-repos';

/** Модуль для работы с удалением сессии */
@Module({
  imports: [SessionAdapterModule],
  exports: [RemoveSessionService],
  controllers: [],
  providers: [RemoveSessionService],
})
export class RemoveTokensModule {}
