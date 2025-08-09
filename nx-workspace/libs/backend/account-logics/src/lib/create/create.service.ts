import { Injectable, Logger } from '@nestjs/common';
import { IAccountPure } from '@common/interfaces/pure-and-base';
import {
  EnumerationErrorCodes,
  SystemResult,
} from '@backend/interfaces/systems';
import * as bcrypt from 'bcrypt';
import * as iconv from 'iconv-lite';
import { AccountAdapterService } from '@backend/adapters-repos';
import { AdapterResultRepo } from '@backend/interfaces/adapters';
import { IAccountFull } from '@common/interfaces/full';

/** Сервис модуля системы создания аккаунтов */
@Injectable()
export class AccountCreateService {
  /**
   * Логгер NestJS для вывода сообщений в консоль.
   * @protected
   */
  private readonly logger = new Logger(AccountCreateService.name);

  /**
   * Конструктор сервиса системы
   * @param {AccountAdapterService} accountAdapterService — Экземпляр адаптера репозитория создания аккаунтов
   */
  constructor(private accountAdapterService: AccountAdapterService) {}

  /**
   * Метод создания аккаунта
   * @param {IAccountPure} dataForNewAccount - Данные для создания аккаунта
   * @returns {Promise<void>} - Результат регистрации аккаунта
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
    const resultRead: AdapterResultRepo<IAccountFull | null> =
      await this.accountAdapterService.readOneBySlug({
        columnName: 'login',
        columnValue: dataForNewAccount.login,
      });

    if (!resultRead.error && resultRead.adapt) {
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
    const resultCreate: AdapterResultRepo<null> =
      await this.accountAdapterService.create({
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
