import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { ValidateTokensManagerService } from '../../managers-level/tokens/validate-tokens/validate-tokens.manager.service';
import { ReqWithCookies } from '../../interfaces/systems/req-with-cookies.interface';

/** Защитник REST-API от не санкционированного доступа */
@Injectable()
export class AuthGuardService implements CanActivate {
  /**
   * Конструктор сервиса системы
   * @param {ValidateTokensManagerService} validateTokensManagerService — Экземпляр сервиса модуля валидации JWT токенов
   */
  constructor(
    private readonly validateTokensManagerService: ValidateTokensManagerService,
  ) {}

  /**
   * Метод проверяющий разрешение на доступ
   * @param {ExecutionContext} context Текущий контекст выполнения. Предоставляет доступ к подробной информации о текущем конвейере запросов.
   * @returns {boolean | Promise<boolean> | Observable<boolean>} Значение, указывающее, разрешено ли выполнение текущего запроса.
   */
  public canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    /** Попутные данные при запросе на данное REST API */
    const request = context.switchToHttp().getRequest<ReqWithCookies>();

    // /** Токен доступа из куков httpOnly */
    const accessToken = request.cookies?.accessToken;

    if (!accessToken) {
      throw new UnauthorizedException(
        'У вас нет доступа к функционалу, вы не авторизованы!',
      );
    }

    /** Результат валидации токена доступа */
    const resultValidateAccessToken =
      this.validateTokensManagerService.validateAnyToken(
        accessToken,
        'accessToken',
      );

    if (resultValidateAccessToken.error) {
      if (
        resultValidateAccessToken.errorMessages?.some((errMes) => {
          return errMes.includes('jwt expired');
        })
      ) {
        throw new UnauthorizedException(
          'Срок действия доступа истек, сессию требуется обновить',
        );
      }

      throw new UnauthorizedException('Доступ истек или был подделан');
    }

    request.authData = resultValidateAccessToken.data;
    return true;
  }
}
