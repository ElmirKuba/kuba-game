import { Injectable } from '@nestjs/common';
import { IAccountUpdate } from '../../../interfaces/with-child/account/account-update.interface';
import { AccountReadManagerService } from '../../../managers-level/account/read/account-read.manager.service';
import { UseCaseResult } from '../../../interfaces/systems/use-case-result.interface';
import { AccountUpdateManagerService } from '../../../managers-level/account/update/update.manager.service';
import { IAccountFull } from 'src/interfaces/full/account/account-full.interface';

/** Сервис модуля бизнес логики уровня UseCase обновления аккаунта */
@Injectable()
export class AccountUpdateUseCaseService {
  /**
   * Конструктор сервиса системы
   * @param {AccountReadManagerService} accountReadManagerService - Экземпляр сервиса модуля бизнес логики уровня Manager чтения аккаунта
   * @param {AccountUpdateManagerService} accountUpdateManagerService - Экземпляр сервиса модуля бизнес логики уровня Manager обновления данных аккаунта
   **/
  constructor(
    private accountReadManagerService: AccountReadManagerService,
    private accountUpdateManagerService: AccountUpdateManagerService,
  ) {}

  public async update(
    accountUpdateData: IAccountUpdate,
  ): Promise<UseCaseResult<null>> {
    /** Результат чтения аккаунта до момента его создания */
    const resultReadBeforeUpdateData =
      await this.accountReadManagerService.readBeforeUpdateData(
        accountUpdateData.id,
      );

    if (resultReadBeforeUpdateData.error) {
      return {
        ...resultReadBeforeUpdateData,
        data: null,
      };
    }

    /** Результат чтения аккаунта до момента его создания */
    const resultUpdatedDataExistingAccount =
      await this.accountUpdateManagerService.updateAccountDataExistingAccount(
        accountUpdateData,
        resultReadBeforeUpdateData.data as IAccountFull,
      );

    if (resultUpdatedDataExistingAccount.error) {
      return {
        ...resultUpdatedDataExistingAccount,
        data: null,
      };
    }

    return {
      ...resultUpdatedDataExistingAccount,
      data: null,
    };
  }
}
