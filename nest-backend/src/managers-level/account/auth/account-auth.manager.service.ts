import { Injectable, Logger } from '@nestjs/common';
import { IAccountFull } from '../../../interfaces/full/account/account-full.interface';
import * as bcrypt from 'bcrypt';
import * as iconv from 'iconv-lite';
import { ManagerResult } from '../../../interfaces/systems/manager-result.interface';
import { EnumerationErrorCodes } from '../../../interfaces/systems/error-codes.interface';
import { IAccountPure } from '../../../interfaces/pure-and-base/account/account-pure.interface';

/** Сервис модуля бизнес логики уровня Manager авторизации аккаунта */
@Injectable()
export class AccountAuthManagerService {
  /**
   * Логгер NestJS для вывода сообщений в консоль.
   * @private
   */
  private readonly logger = new Logger(AccountAuthManagerService.name);

  /**
   * Авторизовать аккаунт который уже существует
   * @param {IAccountPure} dataAccountPure - Данные для авторизации аккаунта
   * @param {IAccountFull} accountDataFromRepositoryAdapter - Данные аккаунта от адаптера репозитория
   */
  authExistingAccount(
    dataAccountPure: IAccountPure,
    accountDataFromRepositoryAdapter: IAccountFull,
  ): ManagerResult<null> {
    /** Массив сообщений для ошибок */
    const errorMessages: string[] = [];
    /** Массив сообщений для успеха */
    const successMessages: string[] = [];

    /** Совместимость с SAMP-сервером, надо строку из UTF-8 переделать в CP-1251 */
    const passwordByCp1251 = iconv.encode(dataAccountPure.password, 'cp1251');

    /** Результат сверки паролей */
    const validPassword = bcrypt.compareSync(
      passwordByCp1251,
      accountDataFromRepositoryAdapter.password,
    );

    if (!validPassword) {
      errorMessages.push(
        `Пароль для аккаунта "${dataAccountPure.login}" указан неверно`,
      );

      this.logger.error(
        `AccountAuthManagerService -> authExistingAccount : Аккаунт с логином ${dataAccountPure.login} не сможет быть авторизован. Причина: пользователь указал неверный пароль от аккаунта`,
      );

      return {
        error: true,
        errorCode: EnumerationErrorCodes.ERROR_CODE_IS_INCORRECT,
        errorMessages,
        successMessages,
        data: null,
      };
    }

    successMessages.push(
      `Аккаунт с логином "${dataAccountPure.login}" успешно авторизован.`,
    );

    this.logger.log(
      `AccountAuthManagerService -> authExistingAccount : Аккаунт с логином ${dataAccountPure.login} был авторизован. Пользователь указал верный пароль от аккаунта.`,
    );

    return {
      error: false,
      errorCode: EnumerationErrorCodes.ERROR_CODE_NULL,
      errorMessages,
      successMessages,
      data: null,
    };
  }
}
