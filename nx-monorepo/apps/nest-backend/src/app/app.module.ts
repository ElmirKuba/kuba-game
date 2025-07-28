import { Module } from '@nestjs/common';
import { DbModule } from '@db';
// import { AccountsModule } from '@backend/accounts';

/** Главный модуль приложения */
@Module({
  // imports: [DbModule, AccountsModule],
  imports: [DbModule],
  exports: [],
  controllers: [],
  providers: [],
})
export class AppModule {}
