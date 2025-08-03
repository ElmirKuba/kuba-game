import { SessionsRepositoryService } from '@backend/orm-repositories';
import { ISessionBase } from '@common/interfaces/pure-and-base';
import { Injectable, Logger } from '@nestjs/common';
import { SystemResult } from '@backend/interfaces/systems';
import { EnumerationErrorCodes } from '@backend/interfaces/systems';

@Injectable()
export class CreateOrUpdateSessionService {
  /**
   * Логгер NestJS для вывода сообщений в консоль.
   * @protected
   */
  private readonly logger = new Logger(CreateOrUpdateSessionService.name);

  /**
   * Конструктор сервиса системы
   * @param {SessionsRepositoryService} sessionsRepositoryService — Экземпляр репозитория для работы с сущностью Sessions
   */
  constructor(private sessionsRepositoryService: SessionsRepositoryService) {}

  /**
   * Метод создания или обновления сессии
   * @param {ISessionBase} dataSessionForCreateOrUpdate - Данные сессии для создания или обновления
   * @returns {Promise<SystemResult<null>>} - Результат создания сессии
   * @public
   */
  async createOrUpdate(
    dataSessionForCreateOrUpdate: ISessionBase,
    counter = 5
  ): Promise<SystemResult<null>> {
    /** Массив сообщений для ошибок */
    const errorMessages: string[] = [];
    /** Массив сообщений для успеха */
    const successMessages: string[] = [];

    const resultRead = await this.sessionsRepositoryService.readOneBySlug([
      {
        columnName: 'ip',
        columnValue: dataSessionForCreateOrUpdate.ip,
      },
      {
        columnName: 'ua',
        columnValue: dataSessionForCreateOrUpdate.ua,
      },
    ]);

    if (resultRead.error) {
      const resultCreated = await this.sessionsRepositoryService.create(
        dataSessionForCreateOrUpdate
      );

      if (resultCreated.error) {
        if (counter >= 1) {
          return await this.createOrUpdate(
            dataSessionForCreateOrUpdate,
            counter--
          );
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
        data: null,
        errorCode: EnumerationErrorCodes.ERROR_CODE_NULL,
        errorMessages,
        successMessages,
      };
    }

    const resultUpdated = await this.sessionsRepositoryService.update({
      id: resultRead.data?.id as string,
      sessionData: dataSessionForCreateOrUpdate,
    });

    if (resultUpdated.error) {
      if (counter >= 1) {
        return await this.createOrUpdate(
          dataSessionForCreateOrUpdate,
          counter--
        );
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
      data: null,
      errorCode: EnumerationErrorCodes.ERROR_CODE_NULL,
      errorMessages,
      successMessages,
    };
  }
}
