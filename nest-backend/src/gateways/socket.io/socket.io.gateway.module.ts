import { Module } from '@nestjs/common';
import { SocketIOGatewayService } from './socket.io.gateway.service';
import { AllUtilityLevelModule } from '../../utility-level/all.utility-level.module';

/** Модуль Gateway Socket.IO непосредственно */
@Module({
  imports: [AllUtilityLevelModule],
  exports: [],
  controllers: [],
  providers: [SocketIOGatewayService],
})
export class SocketIOGatewayModule {}
