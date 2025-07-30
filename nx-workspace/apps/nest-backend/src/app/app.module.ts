import { Module } from '@nestjs/common';
import { SystemModule } from './modules/system.module';
import { OrmSchemasModule } from '@backend/orm-schemas';
import { OrmRepositoriesModule } from '@backend/orm-repositories';

/** Главный модуль NestJS приложения */
@Module({
  imports: [SystemModule, OrmSchemasModule, OrmRepositoriesModule],
  exports: [],
  controllers: [],
  providers: [],
})
export class AppModule {}
