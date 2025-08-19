import { Injectable, Logger } from '@nestjs/common';
import { SessionAdapterService } from '../../../adapters/session/session.adapter.service';
import { ManagerResult } from '../../../interfaces/systems/manager-result.interface';
import { EnumerationErrorCodes } from '../../../interfaces/systems/error-codes.interface';
import { ISessionFull } from '../../../interfaces/full/session/session-full.interface';

/** Сервис модуля бизнес логики уровня manager чтения сессии */
@Injectable()
export class ReadSessionManagerService {
  /**
   * Логгер NestJS для вывода сообщений в консоль.
   * @private
   */
  private readonly logger = new Logger(ReadSessionManagerService.name);

  /**
   * @param {SessionAdapterService} sessionAdapterService - Адаптер репозитория сессий схемы СуБД
   */
  constructor(private sessionAdapterService: SessionAdapterService) {}

  /**
   * Чтение сессии до момента ее удаления
   * @param {string} refreshToken - Токен обновления пары токенов
   * @returns {Promise<ManagerResult<ISessionFull | null>>}
   * @public
   */
  public async readBeforeDelete(
    refreshToken: string,
  ): Promise<ManagerResult<ISessionFull | null>> {
    /** Массив сообщений для ошибок */
    const errorMessages: string[] = [];
    /** Массив сообщений для успеха */
    const successMessages: string[] = [];

    /** Результат нахождения сессии в таблице сессий в СуБД */
    const resultRead = await this.sessionAdapterService.readOneBySlug([
      {
        columnName: 'refreshToken',
        columnValue: refreshToken,
      },
    ]);

    if (resultRead.error && !resultRead.adaptData) {
      errorMessages.push(
        'Сессия для аккаунта не найдена, аккаунт не нуждается в выходе!',
      );

      this.logger.error(
        `ReadSessionManagerService -> readBeforeDelete : Сессия ${refreshToken} не найдена, аккаунт не нуждается в выходе!`,
      );

      return {
        error: true,
        errorCode: EnumerationErrorCodes.ERROR_CODE_NOT_EXISTS,
        successMessages,
        errorMessages,
        data: null,
      };
    }

    successMessages.push(
      'Сессия для аккаунта найдена! Выход из аккаунта может быть произведен!',
    );

    this.logger.log(
      `ReadSessionManagerService -> readBeforeDelete : Сессия ${refreshToken} найдена, аккаунт может произвести выход!`,
    );

    return {
      error: false,
      errorCode: EnumerationErrorCodes.ERROR_CODE_NULL,
      successMessages,
      errorMessages,
      data: resultRead.adaptData,
    };
  }

  /**
   * Чтение сессии до момента ее обновления
   * @param {string} refreshToken - Токен обновления пары токенов
   * @returns {Promise<ManagerResult<ISessionFull | null>>} - Данные обновления сессии
   * @public
   */
  public async readBeforeUpdate(
    refreshToken: string,
  ): Promise<ManagerResult<ISessionFull | null>> {
    /** Массив сообщений для ошибок */
    const errorMessages: string[] = [];
    /** Массив сообщений для успеха */
    const successMessages: string[] = [];

    /** Результат нахождения сессии в таблице сессий в СуБД */
    const resultRead = await this.sessionAdapterService.readOneBySlug([
      {
        columnName: 'refreshToken',
        columnValue: refreshToken,
      },
    ]);

    if (resultRead.error && !resultRead.adaptData) {
      errorMessages.push(
        'Сессия для аккаунта не найдена, аккаунт скорее всего не авторизован, сессия не нуждается в обновлении!',
      );

      this.logger.error(
        `ReadSessionManagerService -> readBeforeUpdate : Сессия ${refreshToken} не найдена, она не может нуждаться в обновлении. Причина: Скорее всего аккаунт не авторизован`,
      );

      return {
        error: true,
        data: null,
        errorMessages,
        successMessages,
        errorCode: EnumerationErrorCodes.ERROR_CODE_NOT_EXISTS,
      };
    }

    successMessages.push(
      'Сессия для аккаунта найдена! Сессия может быть обновлена!',
    );

    this.logger.log(
      `ReadSessionManagerService -> readBeforeUpdate : Сессия ${refreshToken} найдена, она может быть обновлена!`,
    );

    return {
      error: false,
      errorCode: EnumerationErrorCodes.ERROR_CODE_NULL,
      successMessages,
      errorMessages,
      data: resultRead.adaptData,
    };
  }
}
