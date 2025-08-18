import { Module } from '@nestjs/common';
import { RoleGuardService } from './guards/role-guard.service';
import { AuthGuardService } from './guards/auth-guard.service';
import { ValidateTokensManagerModule } from '../managers-level/tokens/validate-tokens/validate-tokens.manager.module';

/** Модуль бизнес логики уровня Utility */
@Module({
  imports: [ValidateTokensManagerModule],
  exports: [
    ValidateTokensManagerModule,
    //
    AuthGuardService,
    RoleGuardService,
  ],
  controllers: [],
  providers: [AuthGuardService, RoleGuardService],
})
export class AllUtilityLevelModule {}
