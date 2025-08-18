import { Module } from '@nestjs/common';
import { AccountCreateUseCaseModule } from './create/account-create.use-case.module';
import { AccountAuthUseCaseModule } from './auth/account-auth.use-case.module';
import { AccountLogoutUseCaseModule } from './logout/logout.use-case.module';

/** Модуль всех модулей бизнес логики уровня UseCase связанных с аккаунтами */
@Module({
  imports: [
    AccountCreateUseCaseModule,
    AccountAuthUseCaseModule,
    AccountLogoutUseCaseModule,
  ],
  exports: [],
  controllers: [],
  providers: [],
})
export class AccountUseCaseModule {}
