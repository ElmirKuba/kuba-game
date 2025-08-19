import { Injectable, Logger } from '@nestjs/common';
import { SessionAdapterService } from '../../../adapters/session/session.adapter.service';
import { ManagerResult } from '../../../interfaces/systems/manager-result.interface';
import { EnumerationErrorCodes } from '../../../interfaces/systems/error-codes.interface';

/** Сервис уровня manager бизнес логики удаления сессии */
@Injectable()
export class DeleteSessionManagerService {
  /**
   * Логгер NestJS для вывода сообщений в консоль.
   * @private
   */
  private readonly logger = new Logger(DeleteSessionManagerService.name);

  /**
   * @param {SessionAdapterService} sessionAdapterService - Адаптер репозитория сессий схемы СуБД
   */
  constructor(private sessionAdapterService: SessionAdapterService) {}

  /**
   * Метод удаления найденной сессии
   * @param {string} id - Идентификатор найденной сессии для удаления
   * @returns {Promise<ManagerResult<ISessionFull | null>>} - Данные удаленной сессии
   * @public
   */
  public async deleteExistingSession(id: string): Promise<ManagerResult<null>> {
    /** Массив сообщений для ошибок */
    const errorMessages: string[] = [];
    /** Массив сообщений для успеха */
    const successMessages: string[] = [];

    const resultDeleted = await this.sessionAdapterService.delete(id);

    if (resultDeleted.error) {
      errorMessages.push(
        `Идентификатор сессии "${id}" не сможет быть удален из-за внутренней ошибки!`,
      );

      this.logger.error(
        `DeleteSessionManagerService -> deleteExistingSession : Идентификатор сессии "${id}" не сможет быть удален. Причина: внутренняя ошибка`,
      );

      return {
        error: true,
        data: null,
        errorMessages,
        successMessages,
        errorCode: EnumerationErrorCodes.ERROR_CODE_INTERNAL_ERROR,
      };
    }

    successMessages.push(
      `Сессия с идентификатором "${id}" была успешно удалена!`,
    );

    this.logger.log(
      `DeleteSessionManagerService -> deleteExistingSession : Сессия с идентификатором "${id}" была успешно удалена!`,
    );

    return {
      error: false,
      data: null,
      successMessages,
      errorMessages,
      errorCode: EnumerationErrorCodes.ERROR_CODE_NULL,
    };
  }
}
