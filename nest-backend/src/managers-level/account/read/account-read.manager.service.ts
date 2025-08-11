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
}
