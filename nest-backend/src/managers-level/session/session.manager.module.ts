import { Module } from '@nestjs/common';
import { CreateOrUpdateSessionManagerModule } from './create-or-update/create-or-update.manager.module';

@Module({
  imports: [CreateOrUpdateSessionManagerModule],
  exports: [],
  controllers: [],
  providers: [],
})
export class SessionManagerModule {}
