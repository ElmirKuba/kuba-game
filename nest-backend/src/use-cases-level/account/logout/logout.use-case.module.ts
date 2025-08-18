import { Module } from '@nestjs/common';
import { AccountLogoutUseCaseService } from './logout.use-case.service';

/** Модуль бизнес логики уровня UseCase выхода из аккаунта */
@Module({
  imports: [],
  exports: [AccountLogoutUseCaseService],
  controllers: [],
  providers: [AccountLogoutUseCaseService],
})
export class AccountLogoutUseCaseModule {}
