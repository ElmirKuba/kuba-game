import { Module } from '@nestjs/common';
import { RefreshSessionService } from './refresh-session.service';
import { ValidateTokensModule } from '../validate-tokens/validate-tokens.module';
import { SessionAdapterModule } from '@backend/adapters-repos';

/** Модуль для работы с обновлением сессии */
@Module({
  imports: [SessionAdapterModule, ValidateTokensModule],
  exports: [RefreshSessionService],
  controllers: [],
  providers: [RefreshSessionService],
})
export class RefreshSessionModule {}
