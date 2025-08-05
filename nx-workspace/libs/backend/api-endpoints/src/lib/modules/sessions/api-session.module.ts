import { forwardRef, Module } from '@nestjs/common';
import { ApiSessionRefreshController } from './api-session-refresh.controller';
import { RefreshSessionModule } from '@backend/sessions-and-tokens';

/** Модуль всех REST-API эндпоинтов связанных с сессиями */
@Module({
  imports: [forwardRef(() => RefreshSessionModule)],
  exports: [],
  controllers: [ApiSessionRefreshController],
  providers: [],
})
export class ApiSessionModule {}
