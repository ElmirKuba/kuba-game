import { Injectable } from '@nestjs/common';
import { AccountsRepositoryService } from '@backend/orm-repositories';
import {
  RepositoryRead,
  RepositoryResult,
} from '@backend/interfaces/orm-repositories';
import { IAccountFull } from '@common/interfaces/full';
import { AdapterResultRepo } from '@backend/interfaces/adapters';
import { IAccountPure } from '@common/interfaces/pure-and-base';

/** Сервис модуля адаптера репозитория для аккаунтов */
@Injectable()
export class AccountAdapterService {
  /**
   * Конструктор сервиса системы
   * @param {AccountsRepositoryService} accountsRepositoryService — Экземпляр репозитория для работы с сущностью Accounts
   */
  constructor(private accountsRepositoryService: AccountsRepositoryService) {}

  /**
   * Создаёт нового пользователя.
   * @param data — объект с полями login и password (id генерируется здесь)
   * @returns {Promise<RepositoryResult<null>>} - Результат создания аккаунта (true - успех | false - не получилось создать аккаунт)
   * @public
   */
  public async create(
    dataForNewAccount: IAccountPure
  ): Promise<AdapterResultRepo<null>> {
    /** Результаты создания аккаунта */
    const resultCreate: RepositoryResult<null> =
      await this.accountsRepositoryService.create(dataForNewAccount);

    return {
      error: resultCreate.error,
      adapt: resultCreate.data,
    };
  }

  /**
   * Метод чтения аккаунта у репозитория аккаунтов
   * @param {RepositoryRead<IAccountFull>} selectionConditions - Данные для чтения аккаунта из репозитория
   * @returns {Promise<AdapterResultRepo<IAccountFull | null>>} - Результат чтения аккаунта из репозитория
   * @public
   */
  async readOneBySlug(
    selectionConditions: RepositoryRead<IAccountFull>
  ): Promise<AdapterResultRepo<IAccountFull | null>> {
    /** Результаты чтения аккаунта */
    const resultRead: RepositoryResult<IAccountFull | null> =
      await this.accountsRepositoryService.readOneBySlug({
        columnName: selectionConditions.columnName,
        columnValue: selectionConditions.columnValue,
      });

    return {
      error: resultRead.error,
      adapt: resultRead.data,
    };
  }
}
