import { Module } from '@nestjs/common';
import { ApiEndpointsModule } from './api-endpoints/api-endpoints.module';
import { SystemModule } from './system/system.module';

/** Главный модуль NestJS приложения */
@Module({
  imports: [
    SystemModule,
    //
    ApiEndpointsModule,
  ],
  exports: [],
  controllers: [],
  providers: [],
})
export class AppModule {}
