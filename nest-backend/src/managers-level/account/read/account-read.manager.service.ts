import { Injectable, Logger } from '@nestjs/common';
import { IAccountPure } from '../../../interfaces/pure-and-base/account/account-pure.interface';
import { ManagerResult } from '../../../interfaces/systems/manager-result.interface';
import { EnumerationErrorCodes } from 'src/interfaces/systems/error-codes.interface';
import { AccountAdapterService } from '../../../adapters/account/account.adapter.service';
import { IAccountFull } from '../../../interfaces/full/account/account-full.interface';
import { AdapterResultRepo } from '../../../interfaces/adapters/result-query.adapter.interface';

/** Сервис модуля бизнес логики уровня Manager чтения аккаунта */
@Injectable()
export class AccountReadManagerService {
  /**
   * Логгер NestJS для вывода сообщений в консоль.
   * @private
   */
  private readonly logger = new Logger(AccountReadManagerService.name);

  /**
   * Конструктор сервиса системы
   * @param {AccountAdapterService} accountAdapterService - Экземпляр сервиса-адаптера создания аккаунта
   **/
  constructor(private accountAdapterService: AccountAdapterService) {}

  /**
   * Прочитать аккаунт до создания
   * @param {IAccountPure} dataForNewAccount - Данные для создания аккаунта
   * @returns {Promise<ManagerResult<IAccountFull | null>>} - Результат чтения аккаунта до момента его создания
   * @public
   * */
  public async readBeforeCreate(
    dataForNewAccount: IAccountPure,
  ): Promise<ManagerResult<IAccountFull | null>> {
    /** Массив сообщений для ошибок */
    const errorMessages: string[] = [];
    /** Массив сообщений для успеха */
    const successMessages: string[] = [];

    /** Результаты чтения аккаунта */
    const resultRead: AdapterResultRepo<IAccountFull | null> =
      await this.accountAdapterService.readOneBySlug({
        columnName: 'login',
        columnValue: dataForNewAccount.login,
      });

    if (!resultRead.error && resultRead.adaptData) {
      errorMessages.push(
        `Аккаунт с логином "${dataForNewAccount.login}" уже существует!`,
      );

      this.logger.error(
        `AccountReadManagerService -> readBeforeCreate : Аккаунт с логином ${dataForNewAccount.login} не сможет быть создан. Причина: логин занят`,
      );

      return {
        error: true,
        errorCode: EnumerationErrorCodes.ERROR_CODE_ALREADY_EXISTS,
        successMessages,
        errorMessages,
        data: resultRead.adaptData,
      };
    }

    successMessages.push(
      `Аккаунт с логином "${dataForNewAccount.login}" не найден!`,
    );

    this.logger.log(
      `AccountReadManagerService -> readBeforeCreate : Аккаунт с логином ${dataForNewAccount.login} сможет быть создан. Причина: логин свободен`,
    );

    return {
      error: false,
      data: null,
      errorCode: EnumerationErrorCodes.ERROR_CODE_NULL,
      errorMessages,
      successMessages,
    };
  }

  /**
   * Прочитать аккаунт до авторизации
   * @param {IAccountPure} dataAccountPure - Данные для авторизации аккаунта
   * @returns {Promise<ManagerResult<IAccountFull | null>>} - Результат чтения аккаунта до момента его авторизации
   * @public
   */
  public async readBeforeAuth(
    dataAccountPure: IAccountPure,
  ): Promise<ManagerResult<IAccountFull | null>> {
    /** Массив сообщений для ошибок */
    const errorMessages: string[] = [];
    /** Массив сообщений для успеха */
    const successMessages: string[] = [];

    /** Результаты чтения аккаунта */
    const resultRead: AdapterResultRepo<IAccountFull | null> =
      await this.accountAdapterService.readOneBySlug({
        columnName: 'login',
        columnValue: dataAccountPure.login,
      });

    if (resultRead.error && !resultRead.adaptData) {
      errorMessages.push(
        `Аккаунт с логином "${dataAccountPure.login}" не существует`,
      );
      successMessages.push(
        `Передайте другой логин, чтобы вновь попробовать авторизоваться`,
      );

      this.logger.error(
        `AccountReadManagerService -> readBeforeAuth : Аккаунт с логином ${dataAccountPure.login} не сможет быть авторизован. Причина: логин не найден`,
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
      `Аккаунт с логином "${dataAccountPure.login}" найден!`,
    );

    this.logger.log(
      `AccountReadManagerService -> readBeforeAuth : Аккаунт с логином ${dataAccountPure.login} сможет быть авторизован. Причина: логин найден`,
    );

    return {
      error: false,
      errorCode: EnumerationErrorCodes.ERROR_CODE_NULL,
      errorMessages,
      successMessages,
      data: resultRead.adaptData,
    };
  }

  /**
   * Прочитать аккаунт имея его идентификатор
   * @param {string} id - Идентификатор аккаунта для его чтения перед обновлением сессии
   * @returns {Promise<ManagerResult<IAccountFull | null>>} - Результат чтения аккаунта по его идентификатору
   * @public
   */
  public async readWithId(
    id: string,
  ): Promise<ManagerResult<IAccountFull | null>> {
    /** Массив сообщений для ошибок */
    const errorMessages: string[] = [];
    /** Массив сообщений для успеха */
    const successMessages: string[] = [];

    /** Результаты чтения аккаунта */
    const resultRead = await this.accountAdapterService.readOneBySlug({
      columnName: 'id',
      columnValue: id,
    });

    if (resultRead.error && !resultRead.adaptData) {
      errorMessages.push(`Аккаунт с идентификатором "${id}" не существует`);
      successMessages.push(
        `Передайте другой идентификатор, чтобы вновь попробовать найти аккаунт`,
      );

      this.logger.error(
        `AccountReadManagerService -> readWithId : Аккаунт с идентификатором "${id}" не существует. Причина: запись не найдена в таблице аккаунтов в БД`,
      );

      return {
        error: true,
        errorCode: EnumerationErrorCodes.ERROR_CODE_NOT_EXISTS,
        errorMessages,
        successMessages,
        data: null,
      };
    }

    successMessages.push(`Аккаунт с идентификатором "${id}" найден!`);

    this.logger.log(
      `AccountReadManagerService -> readWithId : Аккаунт с идентификатором "${id}" найден. Причина: аккаунт есть в таблице аккаунтов в БД`,
    );

    return {
      error: false,
      errorCode: EnumerationErrorCodes.ERROR_CODE_NULL,
      errorMessages,
      successMessages,
      data: resultRead.adaptData,
    };
  }
}
