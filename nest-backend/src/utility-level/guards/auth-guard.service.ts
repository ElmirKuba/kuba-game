import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { ValidateTokensManagerService } from '../../managers-level/tokens/validate-tokens/validate-tokens.manager.service';
import { ReqWithCookies } from '../../interfaces/systems/req-with-cookies.interface';
import { Reflector } from '@nestjs/core';
import { METADATA_KEY_DEFEND } from '../decorators/auth.decorator';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';

/** Защитник REST-API от не санкционированного доступа */
@Injectable()
export class AuthGuardService implements CanActivate {
  /**
   * Конструктор сервиса системы
   * @param {ValidateTokensManagerService} validateTokensManagerService — Экземпляр сервиса модуля валидации JWT токенов
   */
  constructor(
    private readonly validateTokensManagerService: ValidateTokensManagerService,
    private readonly reflector: Reflector,
  ) {}

  /**
   * Метод проверяющий разрешение на доступ
   * @param {ExecutionContext} context Текущий контекст выполнения. Предоставляет доступ к подробной информации о текущем конвейере запросов.
   * @returns {boolean | Promise<boolean> | Observable<boolean>} Значение, указывающее, разрешено ли выполнение текущего запроса.
   */
  public canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    /** Что защищает */
    let requiredDefend = this.reflector.getAllAndOverride<'api' | 'ws'>(
      METADATA_KEY_DEFEND,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredDefend) {
      // автоопределение по типу контекста
      const ctxType = context.getType();
      requiredDefend = ctxType === 'ws' ? 'ws' : 'api';
    }

    if (requiredDefend === 'api') {
      /** HTTP context */
      const req = context.switchToHttp().getRequest<ReqWithCookies>();

      if (!req) {
        throw new UnauthorizedException('Неправильный HTTP контекст');
      }

      console.log('HTTP контекст', req);
    } else {
      /** WS context (socket.io) */
      const client: Socket = context.switchToWs().getClient<Socket>();

      if (!client) {
        throw new WsException('Неправильный WS контекст');
      }

      console.log('ws cli', client);
    }

    // /** Попутные данные при запросе на данное REST API */
    // const request = context.switchToHttp().getRequest<ReqWithCookies>();

    // // /** Токен доступа из куков httpOnly */
    // const accessToken = request.cookies?.accessToken;

    // if (!accessToken) {
    //   const errorText = 'У вас нет доступа к функционалу, вы не авторизованы!';

    //   throw requiredDefend === 'api'
    //     ? new UnauthorizedException(errorText)
    //     : new WsException(errorText);
    // }

    // /** Результат валидации токена доступа */
    // const resultValidateAccessToken =
    //   this.validateTokensManagerService.validateAnyToken(
    //     accessToken,
    //     'accessToken',
    //   );

    // if (resultValidateAccessToken.error) {
    //   if (
    //     resultValidateAccessToken.errorMessages?.some((errMes) => {
    //       return errMes.includes('jwt expired');
    //     })
    //   ) {
    //     const errorText =
    //       'Срок действия доступа истек, сессию требуется обновить';

    //     throw requiredDefend === 'api'
    //       ? new UnauthorizedException(errorText)
    //       : new WsException(errorText);
    //   }

    //   const errorText = 'Доступ истек или был подделан';

    //   throw requiredDefend === 'api'
    //     ? new UnauthorizedException(errorText)
    //     : new WsException(errorText);
    // }

    // request.authData = resultValidateAccessToken.data;
    return true;
  }
}
