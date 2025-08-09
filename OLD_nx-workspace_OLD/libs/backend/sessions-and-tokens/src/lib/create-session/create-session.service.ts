import { ISessionBase } from '@common/interfaces/pure-and-base';
import { Injectable, Logger } from '@nestjs/common';
import { SystemResult } from '@backend/interfaces/systems';
import { EnumerationErrorCodes } from '@backend/interfaces/systems';
import { SessionAdapterService } from '@backend/adapters-repos';

/** Сервис модуля создания или обновления сессии */
@Injectable()
export class CreateOrUpdateSessionService {
  /**
   * Логгер NestJS для вывода сообщений в консоль.
   * @protected
   */
  private readonly logger = new Logger(CreateOrUpdateSessionService.name);

  /**
   * Конструктор сервиса системы
   * @param {SessionAdapterService} sessionAdapterService — Экземпляр адаптера репозитория создания сессии
   */
  constructor(private sessionAdapterService: SessionAdapterService) {}

  /**
   * Метод создания или обновления сессии
   * @param {ISessionBase} dataSessionForCreateOrUpdate - Данные сессии для создания или обновления
   * @param {number} counter - Кол-во попыток для повторения работы
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

    /** Результат нахождения сессии в таблице сессий в СуБД */
    const resultRead = await this.sessionAdapterService.readOneBySlug([
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
      const resultCreated = await this.sessionAdapterService.create(
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

    /** Результат обновления сессии */
    const resultUpdated = await this.sessionAdapterService.update({
      id: resultRead.adapt?.id as string,
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
