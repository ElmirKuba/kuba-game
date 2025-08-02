import { Module } from '@nestjs/common';
import { SystemModule } from './modules/system.module';
import { OrmSchemasModule } from '@backend/orm-schemas';
import { OrmRepositoriesModule } from '@backend/orm-repositories';
import { AccountLogicsModule } from '@backend/systems/account-logics';
import { ApiEndpointsModule } from '@backend/api-endpoints';
import { SystemsTokenModule } from '@backend/token';

/** Главный модуль NestJS приложения */
@Module({
  imports: [
    SystemModule,
    OrmSchemasModule,
    OrmRepositoriesModule,
    AccountLogicsModule,
    ApiEndpointsModule,
    SystemsTokenModule,
  ],
  exports: [],
  controllers: [],
  providers: [],
})
export class AppModule {}
