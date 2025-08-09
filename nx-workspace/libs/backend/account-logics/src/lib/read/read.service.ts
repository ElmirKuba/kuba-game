import { AccountsRepositoryService } from '@backend/orm-repositories';
import { Injectable, Logger } from '@nestjs/common';
import {
  EnumerationErrorCodes,
  SystemReadBySlug,
  SystemResult,
} from '@backend/interfaces/systems';
import { IAccountFull } from '@common/interfaces/full';
import { RepositoryResult } from '@backend/interfaces/orm-repositories';

/** Сервис модуля системы чтения аккаунтов */
@Injectable()
export class AccountReadService {
  /**
   * Логгер NestJS для вывода сообщений в консоль.
   * @protected
   */
  private readonly logger = new Logger(AccountReadService.name);

  /**
   * Конструктор сервиса системы
   * @param {AccountsRepositoryService} accountsRepositoryService — Экземпляр репозитория для работы с сущностью Accounts
   */
  constructor(private accountsRepositoryService: AccountsRepositoryService) {}

  /**
   * Метод получения аккаунта
   * @public
   */
  public async readOneBySlug(
    dataApplicant: SystemReadBySlug<IAccountFull>
  ): Promise<SystemResult<IAccountFull | null>> {
    /** Массив сообщений для ошибок */
    const errorMessages: string[] = [];
    /** Массив сообщений для успеха */
    const successMessages: string[] = [];

    /** Результаты чтения аккаунта */
    const resultRead: RepositoryResult<IAccountFull | null> =
      await this.accountsRepositoryService.readOneBySlug({
        columnName: dataApplicant.key,
        columnValue: dataApplicant.value,
      });

    if (resultRead.error) {
      errorMessages.push(
        `Аккаунт с таким сочитанием ключ-значение не существует ("${dataApplicant.key}":"${dataApplicant.value}")`,
        `Передайте другое сочитанием ключ-значение, чтобы вновь попробовать получить аккаунт`
      );

      return {
        error: true,
        errorCode: EnumerationErrorCodes.ERROR_CODE_NOT_EXISTS,
        errorMessages,
        successMessages,
        data: null,
      };
    }

    successMessages.push(
      `Аккаунт с таким сочитанием ключ-значение найден ("${dataApplicant.key}":"${dataApplicant.value}")`
    );

    return {
      error: false,
      errorCode: EnumerationErrorCodes.ERROR_CODE_NULL,
      data: resultRead.data,
      errorMessages,
      successMessages,
    };
  }
}
