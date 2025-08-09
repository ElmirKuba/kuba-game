import { SessionAdapterService } from '@backend/adapters-repos';
import {
  EnumerationErrorCodes,
  SystemResult,
} from '@backend/interfaces/systems';
import { Injectable, Logger } from '@nestjs/common';

/** Сервис модуля для работы с удалением сессии */
@Injectable()
export class RemoveSessionService {
  /**
   * Логгер NestJS для вывода сообщений в консоль.
   * @protected
   */
  private readonly logger = new Logger(RemoveSessionService.name);

  /**
   * Конструктор сервиса системы
   * @param {SessionAdapterService} sessionAdapterService — Экземпляр адаптера репозитория создания сессии
   */
  constructor(private sessionAdapterService: SessionAdapterService) {}

  /**
   * Метод удаления сессии по токену обновления
   * @param {string} refreshToken - Токен обновления пары токенов
   * @param {number} counter - Кол-во попыток для повторения работы
   * @returns {Promise<SystemResult<null>>} - Результат удаления сессии
   */
  async removeSessionByRefreshToken(
    refreshToken: string,
    counter = 5
  ): Promise<SystemResult<null>> {
    /** Массив сообщений для ошибок */
    const errorMessages: string[] = [];
    /** Массив сообщений для успеха */
    const successMessages: string[] = [];

    if (!refreshToken) {
      errorMessages.push(
        'Сессия для аккаунта не найдена, аккаунт не нуждается в выходе!'
      );

      return {
        error: true,
        errorCode: EnumerationErrorCodes.ERROR_CODE_NOT_EXISTS,
        successMessages,
        errorMessages,
        data: null,
      };
    }

    /** Результат нахождения сессии в таблице сессий в СуБД */
    const resultRead = await this.sessionAdapterService.readOneBySlug([
      {
        columnName: 'refreshToken',
        columnValue: refreshToken,
      },
    ]);

    if (resultRead.error) {
      errorMessages.push(
        'Сессия для аккаунта не найдена, аккаунт не нуждается в выходе!'
      );

      return {
        error: true,
        errorCode: EnumerationErrorCodes.ERROR_CODE_NOT_EXISTS,
        successMessages,
        errorMessages,
        data: null,
      };
    }

    const resultDeleted = await this.sessionAdapterService.remove(
      resultRead.adapt?.id as string
    );

    if (resultDeleted.error) {
      if (counter >= 1) {
        return await this.removeSessionByRefreshToken(refreshToken, counter--);
      }

      return {
        error: true,
        data: null,
        errorCode: EnumerationErrorCodes.ERROR_CODE_INTERNAL_ERROR,
        errorMessages,
        successMessages,
      };
    }

    return {
      error: false,
      errorCode: EnumerationErrorCodes.ERROR_CODE_NULL,
      successMessages,
      errorMessages,
      data: null,
    };
  }
}
