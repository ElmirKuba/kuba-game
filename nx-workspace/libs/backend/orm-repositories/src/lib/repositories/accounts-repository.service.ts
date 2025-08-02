import { Inject, Injectable } from '@nestjs/common';
import { MySql2Database } from 'drizzle-orm/mysql2';
import { accountsSchema } from '@backend/orm-schemas';
import { IAccountPure } from '@common/interfaces/pure-and-base';
import {
  RepositoryRead,
  RepositoryResult,
} from '@backend/interfaces/orm-repositories';
import { v4 as uuidv4 } from 'uuid';
import { IAccountFull } from '@common/interfaces/full';
import { eq } from 'drizzle-orm';

/** Репозиторий для работы с сущностью Accounts через Drizzle + mysql2 pool */
@Injectable()
export class AccountsRepositoryService {
  /**
   * Конструктор сервиса системы
   * @param db — Drizzle‑клиент для MySQL, инжектится из SystemModule под токеном 'DRIZZLE_DB_MYSQL_ONE'
   */
  constructor(
    @Inject('DRIZZLE_DB_MYSQL_ONE')
    private readonly db: MySql2Database<{
      accounts: typeof accountsSchema;
    }>
  ) {}

  /**
   * Создаёт нового пользователя.
   * @param data — объект с полями login и password (id генерируется здесь)
   * @returns {boolean} - Результат создания аккаунта (true - успех | false - не получилось создать аккаунт)
   * @public
   */
  public async create(
    dataForNewAccount: IAccountPure
  ): Promise<RepositoryResult<null>> {
    const tempUuidV4 = uuidv4();
    const tempMilliseconds = Date.now();
    const id = `${tempUuidV4}_${tempMilliseconds}`;

    /** Результат создания аккаунта */
    const resultCreated = await this.db
      .insert(accountsSchema)
      .values({ id, ...dataForNewAccount });

    return {
      error: resultCreated[0].affectedRows ? false : true,
      data: null,
    };
  }

  /**
   * Читает аккаунт из таблицы СуБД
   * @param {RepositoryRead<IAccountFull>} selectionConditions - Данные для чтения аккаунта из таблицы СуБД
   * @returns {Promise<RepositoryResult<IAccountFull | null>>} - Результат чтения аккаунта из таблицы СуБД
   * @public
   */
  public async readOneBySlug(
    selectionConditions: RepositoryRead<IAccountFull>
  ): Promise<RepositoryResult<IAccountFull | null>> {
    if (!selectionConditions.columnName || !selectionConditions.columnValue) {
      return {
        error: true,
        data: null,
      };
    }

    /** Ссылка на столбец таблицы */
    const columnRef = accountsSchema[selectionConditions.columnName];

    /** Результат чтения аккаунта */
    const resultRead = await this.db
      .select()
      .from(accountsSchema)
      .where(eq(columnRef, selectionConditions.columnValue))
      .limit(1);

    if (!resultRead[0]) {
      return {
        error: true,
        data: null,
      };
    }

    return {
      error: false,
      data: {
        id: resultRead[0].id as string,
        login: resultRead[0].login as string,
        password: resultRead[0].password as string,
      },
    };
  }
}
