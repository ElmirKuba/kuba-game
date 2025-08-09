import {
  Abstract,
  DynamicModule,
  ForwardReference,
  Module,
  Provider,
} from '@nestjs/common';
import { AuthGuardService } from './guards/auth-guard.service';
import { ValidateTokensModule } from '@backend/sessions-and-tokens';
import { RoleGuardService } from './guards/role-guard.service';

/** Сервисы на экспорт из модуля */
const exportServices: Array<
  | DynamicModule
  | string
  | symbol
  | Provider
  | ForwardReference
  | Abstract<any>
  | Function
> = [AuthGuardService];

/** Модули на экспорт из модуля */
const exportModules: Array<
  | DynamicModule
  | string
  | symbol
  | Provider
  | ForwardReference
  | Abstract<any>
  | Function
> = [ValidateTokensModule];

/** Модуль всех защитников приложения */
@Module({
  imports: [ValidateTokensModule],
  exports: [...exportServices, ...exportModules],
  controllers: [],
  providers: [AuthGuardService, RoleGuardService],
})
export class GuardsModule {}
