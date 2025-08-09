import { Module } from '@nestjs/common';
import { GenerateTokensModule } from './generate-tokens/generate-tokens.module';
import { CreateOrUpdateSessionModule } from './create-session/create-session.module';
import { ValidateTokensModule } from './validate-tokens/validate-tokens.module';
import { RemoveTokensModule } from './remove-session/remove-session.module';

/** Модуль для работы с JWT токенами и сессиями */
@Module({
  imports: [
    GenerateTokensModule,
    CreateOrUpdateSessionModule,
    ValidateTokensModule,
    RemoveTokensModule,
  ],
  exports: [],
  controllers: [],
  providers: [],
})
export class SessionsAndTokensModule {}
