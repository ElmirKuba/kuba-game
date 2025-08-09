import { Module } from '@nestjs/common';
import { ValidateTokensService } from './validate-tokens.service';

/** Модуль для работы с валидацией JWT токенов */
@Module({
  imports: [],
  exports: [ValidateTokensService],
  controllers: [],
  providers: [ValidateTokensService],
})
export class ValidateTokensModule {}
