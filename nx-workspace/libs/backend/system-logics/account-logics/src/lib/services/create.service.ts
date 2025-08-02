import { Injectable, Logger } from '@nestjs/common';
import { AccountsRepositoryService } from '@backend/orm-repositories';
import { IAccountPure } from '@common/interfaces/pure-and-base';
import { SystemResult } from '@backend/interfaces/systems';
import { EnumerationErrorCodes } from '@backend/interfaces/systems';
import { RepositoryResult } from '@backend/interfaces/orm-repositories';
import { IAccountFull } from '@common/interfaces/full';
import * as bcrypt from 'bcrypt';
import * as iconv from 'iconv-lite';

/** Сервис модуля системы аккаунтов */
@Injectable()
export class AccountCreateLoginService {
  /**
   * Логгер NestJS для вывода сообщений в консоль.
   * @protected
   */
  private readonly logger = new Logger(AccountCreateLoginService.name);

  /**
   * Конструктор сервиса системы
   * @param {AccountsRepositoryService} accountsRepositoryService — Экземпляр репозитория для работы с сущностью Accounts
   */
  constructor(private accountsRepositoryService: AccountsRepositoryService) {}

  /**
   * Метод создания аккаунта
   * @param {IAccountPure} dataForNewAccount - Данные для создания аккаунта
   * @returns {Promise<void>} - Ничего не возвращает
   * @public
   * */
  public async create(
    dataForNewAccount: IAccountPure
  ): Promise<SystemResult<null>> {
    /** Массив сообщений для ошибок */
    const errorMessages: string[] = [];
    /** Массив сообщений для успеха */
    const successMessages: string[] = [];

    /** Результаты чтения аккаунта */
    const resultRead: RepositoryResult<IAccountFull | null> =
      await this.accountsRepositoryService.readOneBySlug({
        columnName: 'login',
        columnValue: dataForNewAccount.login,
      });

    if (!resultRead.error && resultRead.data) {
      errorMessages.push(
        `Аккаунт с логином "${dataForNewAccount.login}" уже существует!`
      );

      if (successMessages.length) {
        this.logger.log(successMessages);
      }
      if (errorMessages.length) {
        this.logger.error(errorMessages);
      }

      return {
        error: true,
        errorCode: EnumerationErrorCodes.ERROR_CODE_ALREADY_EXISTS,
        successMessages,
        errorMessages,
        data: null,
      };
    }

    successMessages.push(
      `Аккаунт с логином "${dataForNewAccount.login}" не найден!`
    );

    /** Совместимость с SAMP-сервером, надо строку из UTF-8 переделать в CP-1251 */
    const passwordByCp1251 = iconv.encode(dataForNewAccount.password, 'cp1251');

    /** Захешированный пароль */
    const tempBcryptHashPassword = bcrypt.hashSync(passwordByCp1251, 8);

    /** Результаты создания аккаунта */
    const resultCreate: RepositoryResult<null> =
      await this.accountsRepositoryService.create({
        ...dataForNewAccount,
        password: tempBcryptHashPassword,
      });

    if (resultCreate.error) {
      errorMessages.push(
        `Ошибка создания аккаунта для логина "${dataForNewAccount.login}": внутренняя ошибка`
      );

      if (successMessages.length) {
        this.logger.log(successMessages);
      }
      if (errorMessages.length) {
        this.logger.error(errorMessages);
      }

      return {
        error: true,
        errorCode: EnumerationErrorCodes.ERROR_CODE_INTERNAL_ERROR,
        successMessages,
        errorMessages,
        data: null,
      };
    }

    successMessages.push(
      `Аккаунт с логином "${dataForNewAccount.login}" успешно создан!`
    );

    if (successMessages.length) {
      this.logger.log(successMessages);
    }
    if (errorMessages.length) {
      this.logger.error(errorMessages);
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
