import { Injectable, Logger } from '@nestjs/common';
import { IAccountPure } from '../../../interfaces/pure-and-base/account/account-pure.interface';
import { UseCaseResult } from '../../../interfaces/systems/use-case-result.interface';
import { EnumerationErrorCodes } from '../../../interfaces/systems/error-codes.interface';
import { AccountReadManagerService } from '../../../managers-level/account/read/account-read.manager.service';

/** Сервис модуля бизнес логики уровня UseCase создания аккаунта */
@Injectable()
export class AccountCreateUseCaseService {
  /**
   * Логгер NestJS для вывода сообщений в консоль.
   * @private
   */
  private readonly logger = new Logger(AccountCreateUseCaseService.name);

  /**
   * Конструктор сервиса системы
   * @param {AccountReadManagerService} accountReadManagerService - Экземпляр сервиса модуля бизнес логики уровня Manager чтения аккаунта
   **/
  constructor(private accountReadManagerService: AccountReadManagerService) {}

  /**
   * Метод создания аккаунта
   * @param {IAccountPure} dataForNewAccount - Данные для создания аккаунта
   * @returns {Promise<void>} - Результат регистрации аккаунта
   * @public
   * */
  public async create(
    dataForNewAccount: IAccountPure,
  ): Promise<UseCaseResult<null>> {
    /** Массив сообщений для ошибок */
    const errorMessages: string[] = [];
    /** Массив сообщений для успеха */
    const successMessages: string[] = [];

    /** Результат чтения аккаунта до момента его создания */
    const resultReadBeforeCreate =
      await this.accountReadManagerService.readBeforeCreate(dataForNewAccount);

    if (resultReadBeforeCreate.error) {
      return {
        ...resultReadBeforeCreate,
        data: null,
      };
    }

    console.log('>>resultReadBeforeCreate>>', resultReadBeforeCreate);

    return {
      error: false,
      data: null,
      errorCode: EnumerationErrorCodes.ERROR_CODE_NULL,
      errorMessages,
      successMessages,
    };
  }
}
