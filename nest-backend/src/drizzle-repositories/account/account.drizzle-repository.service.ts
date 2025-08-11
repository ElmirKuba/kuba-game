import { Injectable } from '@nestjs/common';
import { MySql2Database } from 'drizzle-orm/mysql2';
import { v4 as uuidv4 } from 'uuid';
import { eq } from 'drizzle-orm';
import { accountSchema } from '../../system/orm-schemas/account.schema';
import { InjectDrizzle } from '@knaadh/nestjs-drizzle-mysql2';
import { IAccountPure } from '../../interfaces/pure-and-base/account/account-pure.interface';
import { ReadQueryRepository } from '../../interfaces/orm-repositories/read-query.repository.interface';
import { IAccountFull } from '../../interfaces/full/account/account-full.interface';
import { ResultQueryRepository } from '../../interfaces/orm-repositories/result-query.repository.interface';

/** Сервис модуля репозитория для работы данными аккаунта через схему аккаунта */
@Injectable()
export class AccountDrizzleRepositoryService {
  /**
   * Конструктор сервиса системы
   * @param db — Drizzle‑клиент для MySQL, инжектится из SystemModule под токеном 'DRIZZLE_DB_MYSQL_ONE'
   */
  constructor(
    @InjectDrizzle('DRIZZLE_DB_MYSQL_ONE')
    private readonly db: MySql2Database<{
      accounts: typeof accountSchema;
    }>,
  ) {}

  /**
   * Создаёт нового пользователя.
   * @param data — объект с полями login и password (id генерируется здесь)
   * @returns {Promise<ResultQueryRepository<null>>} - Результат создания аккаунта (true - успех | false - не получилось создать аккаунт)
   * @public
   */
  public async create(
    dataForNewAccount: IAccountPure,
  ): Promise<ResultQueryRepository<null>> {
    /** UUID_V4 идентификатор */
    const tempUuidV4 = uuidv4();
    /** Кол-во мс сейчас */
    const tempMilliseconds = Date.now();
    /** Формируем идентификатор вида uuid-v4_unixtime(13length) */
    const id = `${tempUuidV4}_${tempMilliseconds}`;

    /** Результат создания аккаунта */
    const resultCreated = await this.db
      .insert(accountSchema)
      .values({ id, ...dataForNewAccount });

    return {
      error: resultCreated[0].affectedRows ? false : true,
      data: null,
    };
  }

  /**
   * Читает аккаунт из таблицы СуБД
   * @param {RepositoryRead<IAccountFull>} selectionConditions - Данные для чтения аккаунта из таблицы СуБД
   * @returns {Promise<ResultQueryRepository<IAccountFull | null>>} - Результат чтения аккаунта из таблицы СуБД
   * @public
   */
  public async readOneBySlug(
    selectionConditions: ReadQueryRepository<IAccountFull>,
  ): Promise<ResultQueryRepository<IAccountFull | null>> {
    if (!selectionConditions.columnName || !selectionConditions.columnValue) {
      return {
        error: true,
        data: null,
      };
    }

    /** Ссылка на столбец таблицы */
    const columnRef = accountSchema[selectionConditions.columnName];

    /** Результат чтения аккаунта */
    const resultRead = await this.db
      .select()
      .from(accountSchema)
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
