import { Module } from '@nestjs/common';
import { SystemGenerateTokenService } from './generate.service';

/** Модуль для работы с генерацией JWT токенов */
@Module({
  imports: [],
  exports: [SystemGenerateTokenService],
  controllers: [],
  providers: [SystemGenerateTokenService],
})
export class SystemsGenerateTokenModule {}
