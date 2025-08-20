import { Injectable } from '@nestjs/common';
import { IAccountUpdate } from '../../../interfaces/with-child/account/account-update.interface';
import { AccountReadManagerService } from '../../../managers-level/account/read/account-read.manager.service';

/** Сервис модуля бизнес логики уровня UseCase обновления аккаунта */
@Injectable()
export class AccountUpdateUseCaseService {
  /**
   * Конструктор сервиса системы
   * @param {AccountReadManagerService} accountReadManagerService - Экземпляр сервиса модуля бизнес логики уровня Manager чтения аккаунта
   **/
  constructor(private accountReadManagerService: AccountReadManagerService) {}

  public async update(accountUpdateData: IAccountUpdate) {
    console.log('accountUpdateData', accountUpdateData);

    // this.accountReadManagerService.readBeforeAuth

    // if (accountUpdateData.accountData.password) {
    // }
  }
}
