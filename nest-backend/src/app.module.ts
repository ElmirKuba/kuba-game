import { DynamicModule, ForwardReference, Module, Type } from '@nestjs/common';
import { ApiEndpointsModule } from './api-endpoints/api-endpoints.module';
import { SystemModule } from './system/system.module';
import { AllUseCaseModule } from './use-cases-level/all.use-case.module';
import { AllManagerModule } from './managers-level/all.manager.module';
import { AllAdaptersModule } from './adapters/all.adapter.module';
import { AllDrizzleRepositoriesModule } from './drizzle-repositories/all.drizzle-repositories.module';

/** Импорты системных модулей */
const importsSystemsModules: Array<
  Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference
> = [SystemModule];

/** Импорты модулей работы с REST-API */
const importsApiEndpointsModules: Array<
  Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference
> = [ApiEndpointsModule];

/** Импорты модулей Use-Case уровня */
const importsUseCasesModules: Array<
  Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference
> = [AllUseCaseModule];

/** Импорты модулей Manager уровня */
const importsManagersModules: Array<
  Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference
> = [AllManagerModule];

/** Импорты модулей-адаптеров */
const importsAdaptersModules: Array<
  Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference
> = [AllAdaptersModule];

/** Импорты модулей-адаптеров */
const importsDrizzleRepositoriesModules: Array<
  Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference
> = [AllDrizzleRepositoriesModule];

/** Главный модуль NestJS приложения */
@Module({
  imports: [
    ...importsSystemsModules,
    ...importsApiEndpointsModules,
    ...importsUseCasesModules,
    ...importsManagersModules,
    ...importsAdaptersModules,
    ...importsDrizzleRepositoriesModules,
  ],
  exports: [],
  controllers: [],
  providers: [],
})
export class AppModule {}
