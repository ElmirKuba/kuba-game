import {
  EnumerationErrorCodes,
  SystemResult,
} from '@backend/interfaces/systems';
import { Injectable, Logger } from '@nestjs/common';
import { RemoveSessionService } from '@backend/sessions-and-tokens';

/** Сервис модуля системы выхода из аккаунтов */
@Injectable()
export class AccountLogoutService {
  /**
   * Логгер NestJS для вывода сообщений в консоль.
   * @protected
   */
  private readonly logger = new Logger(AccountLogoutService.name);

  /**
   * Конструктор сервиса системы
   * @param {RemoveSessionService} removeTokensService — Экземпляр сервиса для удаления сессии
   */
  constructor(private removeTokensService: RemoveSessionService) {}

  /**
   * Метод выхода из аккаунта
   * @param {string} refreshToken - Токен обновления пары токенов для выхода из аккаунта
   * @returns {Promise<SystemResult<null>>} - Результаты работы метода выхода из аккаунта
   * @public
   */
  public async logout(refreshToken: string): Promise<SystemResult<null>> {
    /** Массив сообщений для ошибок */
    const errorMessages: string[] = [];
    /** Массив сообщений для успеха */
    const successMessages: string[] = [];

    if (!refreshToken) {
      errorMessages.push(
        'Выход из аккаунта не требуется, активная сессия не найдена!'
      );

      return {
        error: true,
        errorCode: EnumerationErrorCodes.ERROR_CODE_IS_INCORRECT,
        data: null,
        errorMessages,
        successMessages,
      };
    }

    const sessionHasDeleted =
      await this.removeTokensService.removeSessionByRefreshToken(refreshToken);

    if (!sessionHasDeleted) {
      errorMessages.push(
        `Невозможно провести выход из аккаунта, пока что не получилось удалить сессию!`
      );

      return {
        error: true,
        errorMessages,
        successMessages,
        data: null,
        errorCode: EnumerationErrorCodes.ERROR_CODE_INTERNAL_ERROR,
      };
    }

    successMessages.push(`Вы успешно вышли из аккаунта!`);

    return {
      error: false,
      data: null,
      errorCode: EnumerationErrorCodes.ERROR_CODE_NULL,
      errorMessages,
      successMessages,
    };
  }
}
