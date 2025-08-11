import { Module } from '@nestjs/common';
import { AccountManagerModule } from './account/account.manager.module';

/** Модуль всех модулей бизнес логики уровня Manager */
@Module({
  imports: [AccountManagerModule],
  exports: [],
  controllers: [],
  providers: [],
})
export class AllManagerModule {}
