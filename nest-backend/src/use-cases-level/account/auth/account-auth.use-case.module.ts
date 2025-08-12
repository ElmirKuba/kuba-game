import { Module } from '@nestjs/common';
import { AccountAuthUseCaseService } from './account-auth.use-case.service';
import { AccountReadManagerModule } from '../../../managers-level/account/read/account-read.manager.module';
import { AccountAuthManagerModule } from '../../../managers-level/account/auth/account-auth.manager.module';
import { GenerateTokensManagerModule } from '../../../managers-level/tokens/generate-tokens/generate-tokens.manager.module';

/** Модуль бизнес логики уровня UseCase авторизации аккаунта */
@Module({
  imports: [
    AccountReadManagerModule,
    AccountAuthManagerModule,
    GenerateTokensManagerModule,
  ],
  exports: [AccountAuthUseCaseService],
  controllers: [],
  providers: [AccountAuthUseCaseService],
})
export class AccountAuthUseCaseModule {}
