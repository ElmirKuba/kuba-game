import { forwardRef, Module } from '@nestjs/common';
import { RefreshSessionService } from './refresh-session.service';
import { OrmRepositoriesModule } from '@backend/orm-repositories';
import { ValidateTokensModule } from '../validate-tokens/validate-tokens.module';
import { AccountLogicsModule } from '@backend/systems/account-logics';

/** Модуль для работы с обновлением сессии */
@Module({
  imports: [
    OrmRepositoriesModule,
    ValidateTokensModule,
    forwardRef(() => AccountLogicsModule),
  ],
  exports: [RefreshSessionService],
  controllers: [],
  providers: [RefreshSessionService],
})
export class RefreshSessionModule {}
