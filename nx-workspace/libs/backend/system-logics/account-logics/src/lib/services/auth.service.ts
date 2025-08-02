import { RepositoryResult } from '@backend/interfaces/orm-repositories';
import {
  EnumerationErrorCodes,
  SystemResult,
} from '@backend/interfaces/systems';
import { AccountsRepositoryService } from '@backend/orm-repositories';
import { IAccountFull } from '@common/interfaces/full';
import { IAccountPure } from '@common/interfaces/pure-and-base';
import { Injectable, Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as iconv from 'iconv-lite';
import { AccountToOutputFrontend } from '@backend/dtos/output';
import { IAccountWithoutPassword } from '@common/interfaces/full';
import { SystemGenerateTokenService } from '@backend/token';
import { IPairTokens } from '@common/interfaces/tokens';

/** Сервис модуля системы аккаунтов */
@Injectable()
export class AccountAuthService {
  /**
   * Логгер NestJS для вывода сообщений в консоль.
   * @protected
   */
  private readonly logger = new Logger(AccountAuthService.name);

  /**
   * Конструктор сервиса системы
   * @param {AccountsRepositoryService} accountsRepositoryService — Экземпляр репозитория для работы с сущностью Accounts
   * @param {SystemGenerateTokenService} systemGenerateTokenService - Экземпляр сервиса модуля генерации JWT токенов
   */
  constructor(
    private accountsRepositoryService: AccountsRepositoryService,
    private systemGenerateTokenService: SystemGenerateTokenService
  ) {}

  /**
   * Метод авторизации аккаунта
   * @param {IAccountPure} dataForAuthCurrectAccount - Данные для авторизации аккаунта
   * @returns {Promise<SystemResult<null>>} - Результаты работы метода авторизации аккаунта
   * @public
   */
  public async auth(
    dataForAuthCurrectAccount: IAccountPure
  ): Promise<SystemResult<IAccountWithoutPassword | null>> {
    /** Массив сообщений для ошибок */
    const errorMessages: string[] = [];
    /** Массив сообщений для успеха */
    const successMessages: string[] = [];

    /** Результаты чтения аккаунта */
    const resultRead: RepositoryResult<IAccountFull | null> =
      await this.accountsRepositoryService.readOneBySlug({
        columnName: 'login',
        columnValue: dataForAuthCurrectAccount.login,
      });

    if (resultRead.error) {
      errorMessages.push(
        `Аккаунт с логином "${dataForAuthCurrectAccount.login}" не существует`,
        `Передайте другой логин, чтобы вновь попробовать авторизоваться`
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
      `Аккаунт с логином "${dataForAuthCurrectAccount.login}" найден!`
    );

    /** Совместимость с SAMP-сервером, надо строку из UTF-8 переделать в CP-1251 */
    const passwordByCp1251 = iconv.encode(
      dataForAuthCurrectAccount.password,
      'cp1251'
    );

    const validPassword = bcrypt.compareSync(
      passwordByCp1251,
      resultRead.data?.password as string
    );

    if (!validPassword) {
      errorMessages.push(
        `Пароль для аккаунта "${dataForAuthCurrectAccount.login}" указан неверно`
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
      `Вы успешно авторизовались в аккаунт с логином "${dataForAuthCurrectAccount.login}"!`
    );

    /** Данные аккаунта без поля пароля для Frontend */
    const accountToOutputFromFrontendDto: IAccountWithoutPassword =
      new AccountToOutputFrontend(resultRead.data);

    const pairTokens: IPairTokens =
      this.systemGenerateTokenService.generatePairTokens({
        accountDto: accountToOutputFromFrontendDto,
      });

    console.log('pairTokens::', pairTokens);

    // TODO: ElmirKuba 2025-08-02: Продолжить работу с токенами

    // const resultSavedToken =
    //   await this.systemSaveOrUpdateTokenService.saveOrUpdate({
    //     accountIDFK: authAccount.accountIDPK,
    //     refreshToken: pairTokens.refreshToken,
    //   });

    return {
      error: false,
      errorCode: EnumerationErrorCodes.ERROR_CODE_NULL,
      errorMessages,
      successMessages,
      data: accountToOutputFromFrontendDto,
    };
  }
}
