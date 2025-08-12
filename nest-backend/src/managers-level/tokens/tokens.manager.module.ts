import { Module } from '@nestjs/common';
import { GenerateTokensManagerModule } from './generate-tokens/generate-tokens.manager.module';

/** Модуль всех модулей бизнес логики уровня Manager связанных с токенами */
@Module({
  imports: [GenerateTokensManagerModule],
  exports: [],
  controllers: [],
  providers: [],
})
export class TokensManagerModule {}
