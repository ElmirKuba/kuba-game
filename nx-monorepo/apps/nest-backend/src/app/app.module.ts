import { Module } from '@nestjs/common';
import { SystemModule } from '@backend/system';
import { AccountsModule } from '@backend/accounts';

/** Главный модуль приложения */
@Module({
  imports: [SystemModule, AccountsModule],
  exports: [],
  controllers: [],
  providers: [],
})
export class AppModule {}
