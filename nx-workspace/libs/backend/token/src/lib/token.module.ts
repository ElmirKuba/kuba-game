import { Module } from '@nestjs/common';
import { SystemsGenerateTokenModule } from './generate/generate.module';

/** Модуль для работы с JWT токенами */
@Module({
  imports: [SystemsGenerateTokenModule],
  exports: [],
  controllers: [],
  providers: [],
})
export class SystemsTokenModule {}
