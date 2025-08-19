import { Injectable, Logger } from '@nestjs/common';
import { ISessionBase } from '../../../interfaces/pure-and-base/session/session-base.interface';
import { SessionAdapterService } from '../../../adapters/session/session.adapter.service';
import { EnumerationErrorCodes } from '../../../interfaces/systems/error-codes.interface';
import { ManagerResult } from '../../../interfaces/systems/manager-result.interface';
import { ISessionFull } from '../../../interfaces/full/session/session-full.interface';

/** Сервис модуля бизнес логики уровня Manager связанных с созданием и/или обновления сессии авторизованного аккаунта */
@Injectable()
export class CreateOrUpdateSessionManagerService {
  /**
   * Логгер NestJS для вывода сообщений в консоль.
   * @private
   */
  private readonly logger = new Logger(
    CreateOrUpdateSessionManagerService.name,
  );

  /**
   * Конструктор сервиса системы
   * @param {SessionAdapterService} sessionAdapterService - Экземпляр сервиса модуля адаптера репозитория для сессий
   **/
  constructor(private sessionAdapterService: SessionAdapterService) {}

  public async createOrUpdate(
    dataSessionForCreateOrUpdate: ISessionBase,
  ): Promise<ManagerResult<ISessionFull | null>> {
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

    if (resultRead.error && !resultRead.adaptData) {
      const resultCreated = await this.sessionAdapterService.create(
        dataSessionForCreateOrUpdate,
      );

      if (resultCreated.error) {
        errorMessages.push(
          `Сессию для UA "${dataSessionForCreateOrUpdate.ua}" с IP-адресом "${dataSessionForCreateOrUpdate.ip}" создать не получилось. Возможно это внутренняя ошибка, попробуйте позже.`,
        );

        this.logger.error(
          `CreateOrUpdateSessionManagerService -> createOrUpdate : Сессию для UA "${dataSessionForCreateOrUpdate.ua}" с IP-адресом "${dataSessionForCreateOrUpdate.ip}" создать не получилось. Причина: внутренняя ошибка`,
        );

        return {
          error: true,
          data: null,
          errorCode: EnumerationErrorCodes.ERROR_CODE_INTERNAL_ERROR,
          errorMessages,
          successMessages,
        };
      }

      successMessages.push(
        `Сессия для UA "${dataSessionForCreateOrUpdate.ua}" с IP-адресом "${dataSessionForCreateOrUpdate.ip}" успешно создана.`,
      );

      this.logger.log(
        `CreateOrUpdateSessionManagerService -> createOrUpdate : Сессия для UA "${dataSessionForCreateOrUpdate.ua}" с IP-адресом "${dataSessionForCreateOrUpdate.ip}" успешно создана.`,
      );

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
      id: resultRead.adaptData?.id as string,
      sessionData: dataSessionForCreateOrUpdate,
    });

    if (resultUpdated.error) {
      errorMessages.push(
        `Сессию для UA "${dataSessionForCreateOrUpdate.ua}" с IP-адресом "${dataSessionForCreateOrUpdate.ip}" обновить не получилось. Возможно это внутренняя ошибка, попробуйте позже.`,
      );

      this.logger.error(
        `CreateOrUpdateSessionManagerService -> createOrUpdate : Сессию для UA "${dataSessionForCreateOrUpdate.ua}" с IP-адресом "${dataSessionForCreateOrUpdate.ip}" обновить не получилось. Причина: внутренняя ошибка`,
      );

      return {
        error: true,
        data: null,
        errorCode: EnumerationErrorCodes.ERROR_CODE_INTERNAL_ERROR,
        errorMessages,
        successMessages,
      };
    }

    successMessages.push(
      `Сессия для UA "${dataSessionForCreateOrUpdate.ua}" с IP-адресом "${dataSessionForCreateOrUpdate.ip}" успешно обновлена.`,
    );

    this.logger.log(
      `CreateOrUpdateSessionManagerService -> createOrUpdate : Сессия для UA "${dataSessionForCreateOrUpdate.ua}" с IP-адресом "${dataSessionForCreateOrUpdate.ip}" успешно обновлена.`,
    );

    return {
      error: false,
      data: null,
      errorCode: EnumerationErrorCodes.ERROR_CODE_NULL,
      errorMessages,
      successMessages,
    };
  }
}
