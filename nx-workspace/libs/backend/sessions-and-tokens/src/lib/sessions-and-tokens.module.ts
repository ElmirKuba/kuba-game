import { Module } from '@nestjs/common';
import { GenerateTokensModule } from './generate-tokens/generate-tokens.module';
import { CreateOrUpdateSessionModule } from './create-session/create-session.module';

/** Модуль для работы с JWT токенами и сессиями */
@Module({
  imports: [GenerateTokensModule, CreateOrUpdateSessionModule],
  exports: [],
  controllers: [],
  providers: [],
})
export class SessionsAndTokensModule {}
