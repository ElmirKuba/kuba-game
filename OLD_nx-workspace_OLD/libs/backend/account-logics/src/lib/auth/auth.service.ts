import {
  EnumerationErrorCodes,
  SystemResult,
} from '@backend/interfaces/systems';
import { IAccountFull } from '@common/interfaces/full';
import { IAccountPure } from '@common/interfaces/pure-and-base';
import { Injectable, Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as iconv from 'iconv-lite';
import { AccountToOutputFrontend } from '@backend/dtos/output';
import { IAccountWithoutPassword } from '@common/interfaces/full';
import {
  CreateOrUpdateSessionService,
  GenerateTokensService,
} from '@backend/sessions-and-tokens';
import { IPairTokens } from '@common/interfaces/tokens';
import { IBrowser, ICPU, IResult } from 'ua-parser-js';
import { AccountAdapterService } from '@backend/adapters-repos';
import { AdapterResultRepo } from '@backend/interfaces/adapters';

/** Сервис модуля системы авторизации аккаунтов */
@Injectable()
export class AccountAuthService {
  /**
   * Логгер NestJS для вывода сообщений в консоль.
   * @protected
   */
  private readonly logger = new Logger(AccountAuthService.name);

  /**
   * Конструктор сервиса системы
   * @param {AccountAdapterService} accountAdapterService — Экземпляр адаптера репозитория создания аккаунтов
   * @param {GenerateTokensService} generateTokensService - Экземпляр сервиса модуля генерации JWT токенов
   * @param {CreateOrUpdateSessionService} createOrUpdateSessionService - Экземпляр сервиса модуля создания сессии
   */
  constructor(
    private accountAdapterService: AccountAdapterService,
    private generateTokensService: GenerateTokensService,
    private createOrUpdateSessionService: CreateOrUpdateSessionService
  ) {}

  /**
   * Метод авторизации аккаунта
   * TODO: Описать {@}param
   * @returns {Promise<SystemResult<null>>} - Результаты работы метода авторизации аккаунта
   * @public
   */
  public async auth({
    dataForAuthCurrectAccount,
    userAgentData,
    userIp,
  }: {
    /** Данные аккаунта для авторизации */
    dataForAuthCurrectAccount: IAccountPure;
    /** Данные парсинга user-agent */
    userAgentData?: IResult;
    /** IP-адрес пользователя */
    userIp?: string;
  }): Promise<
    SystemResult<{
      account: IAccountWithoutPassword | null;
      tokens: IPairTokens;
    } | null>
  > {
    /** Массив сообщений для ошибок */
    const errorMessages: string[] = [];
    /** Массив сообщений для успеха */
    const successMessages: string[] = [];

    /** Результаты чтения аккаунта */
    const resultRead: AdapterResultRepo<IAccountFull | null> =
      await this.accountAdapterService.readOneBySlug({
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

    /** Результат сверки паролей */
    const validPassword = bcrypt.compareSync(
      passwordByCp1251,
      resultRead.adapt?.password as string
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

    /** Данные аккаунта без поля пароля для Frontend */
    const accountToOutputFromFrontendDto: IAccountWithoutPassword =
      new AccountToOutputFrontend(resultRead.adapt);

    /** Новая пара токенов */
    const pairTokens: IPairTokens =
      this.generateTokensService.generatePairTokens({
        accountDto: accountToOutputFromFrontendDto,
        userAgentData,
        userIp,
      });

    /** Данные браузера для сессии */
    const browserData = Object.values(userAgentData?.browser as IBrowser)
      .map((browserDataItem) => {
        return browserDataItem ?? '';
      })
      .join(' ');
    /** Данные процессора для сессии */
    const cpuArchitecture = Object.values(userAgentData?.cpu as ICPU)
      .map((cpuArchitectureItem) => {
        return cpuArchitectureItem ?? '';
      })
      .join(' ');
    /** Данные устройства для сессии */
    const deviceData = Object.values(userAgentData?.device as ICPU)
      .map((deviceDataItem) => {
        return deviceDataItem ?? '';
      })
      .join(' ');
    /** Данные операционной системы для сессии */
    const osData = Object.values(userAgentData?.os as ICPU)
      .map((osDataItem) => {
        return osDataItem ?? '';
      })
      .join(' ');

    /** Результат сохранения сесиии */
    const resultSavedToken = this.createOrUpdateSessionService.createOrUpdate({
      accountId: resultRead.adapt?.id as string,
      browserData,
      cpuArchitecture,
      deviceData,
      ip: userIp as string,
      osData,
      refreshToken: pairTokens.refreshToken,
      ua: userAgentData?.ua as string,
    });

    if (!resultSavedToken) {
      errorMessages.push(
        `Невозможно провести авторизацию аккаунта "${dataForAuthCurrectAccount.login}", пока что не получилось создать сессию!`
      );

      return {
        error: true,
        errorMessages,
        successMessages,
        data: null,
        errorCode: EnumerationErrorCodes.ERROR_CODE_INTERNAL_ERROR,
      };
    }

    successMessages.push(
      `Вы успешно авторизовались в аккаунт с логином "${dataForAuthCurrectAccount.login}"!`
    );

    return {
      error: false,
      errorCode: EnumerationErrorCodes.ERROR_CODE_NULL,
      errorMessages,
      successMessages,
      data: {
        account: accountToOutputFromFrontendDto,
        tokens: pairTokens,
      },
    };
  }
}
