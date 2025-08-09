import { IValidateToken } from '@backend/interfaces/systems';
import { ValidateTokensService } from '@backend/sessions-and-tokens';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';

/** Защитник REST-API от не санкционированного доступа */
@Injectable()
export class AuthGuardService implements CanActivate {
  /**
   * Конструктор сервиса системы
   * @param {ValidateTokensService} validateTokensService — Экземпляр сервиса модуля валидации JWT токенов
   */
  constructor(private readonly validateTokensService: ValidateTokensService) {}

  /**
   * Метод проверяющий разрешение на доступ
   * @param {ExecutionContext} context Текущий контекст выполнения. Предоставляет доступ к подробной информации о текущем конвейере запросов.
   * @returns {boolean | Promise<boolean> | Observable<boolean>} Значение, указывающее, разрешено ли выполнение текущего запроса.
   */
  public canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    /** Попутные данные при запросе на данное REST API */
    const request = context
      .switchToHttp()
      .getRequest<Request & { authData?: IValidateToken['data'] }>();

    /** Токен доступа из куков httpOnly */
    const accessToken = request.cookies?.accessToken;

    if (!accessToken) {
      throw new UnauthorizedException(
        'В ваших cookies отсутствует метка о доступе'
      );
    }

    /** Результат валидации токена доступа */
    const resultValidateAccessToken =
      this.validateTokensService.validateAnyToken(accessToken, 'accessToken');

    if (resultValidateAccessToken.error) {
      if (
        resultValidateAccessToken.errorMessages?.some((errMes) => {
          return errMes.includes('jwt expired');
        })
      ) {
        throw new UnauthorizedException('Срок действия токена истёк');
      }

      throw new UnauthorizedException(
        'AccessToken недействителен или подделан'
      );
    }

    request.authData = resultValidateAccessToken.data;
    return true;
  }
}
