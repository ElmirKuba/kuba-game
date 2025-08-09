import { Module } from '@nestjs/common';
import { GenerateTokensService } from './generate-tokens.service';

/** Модуль для работы с генерацией JWT токенов */
@Module({
  imports: [],
  exports: [GenerateTokensService],
  controllers: [],
  providers: [GenerateTokensService],
})
export class GenerateTokensModule {}
