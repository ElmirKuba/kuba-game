import { Inject, Injectable } from '@nestjs/common';
import { MySql2Database } from 'drizzle-orm/mysql2';
import { accountsSchema } from '@backend/orm-schemas';
import { IAccountPure } from '@common/interfaces/pure-and-base';
import { RepositoryResult } from '@backend/interfaces/orm-repositories';
import { v4 as uuidv4 } from 'uuid';

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
   */
  public async create(
    dataForNewAccount: IAccountPure
  ): Promise<RepositoryResult> {
    const tempUuidV4 = uuidv4();
    const tempMilliseconds = Date.now();
    const id = `${tempUuidV4}_${tempMilliseconds}`;

    const [resultCreated] = await this.db
      .insert(accountsSchema)
      .values({ id, ...dataForNewAccount });

    return { error: resultCreated.affectedRows ? false : true };
  }
}
