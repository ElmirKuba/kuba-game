import { Module } from '@nestjs/common';
import { SystemModule } from './modules/system.module';
import { OrmSchemasModule } from '@backend/orm-schemas';
import { OrmRepositoriesModule } from '@backend/orm-repositories';
import { AccountLogicsModule } from '@backend/systems/account-logics';
import { ApiEndpointsModule } from '@backend/api-endpoints';
import { SessionsAndTokensModule } from '@backend/sessions-and-tokens';
import { GuardsModule } from '@backend/guards';
import { AdaptersRepositoriesModule } from '@backend/adapters-repos';

/** Главный модуль NestJS приложения */
@Module({
  imports: [
    SystemModule,
    ApiEndpointsModule,

    AccountLogicsModule,
    SessionsAndTokensModule,

    AdaptersRepositoriesModule,

    OrmRepositoriesModule,
    OrmSchemasModule,

    GuardsModule,
  ],
  exports: [],
  controllers: [],
  providers: [],
})
export class AppModule {}
