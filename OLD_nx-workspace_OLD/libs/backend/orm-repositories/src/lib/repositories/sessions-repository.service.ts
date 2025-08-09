import {
  RepositoryRead,
  RepositoryResult,
} from '@backend/interfaces/orm-repositories';
import { sessionsSchema } from '@backend/orm-schemas';
import { ISessionFull } from '@common/interfaces/full';
import { ISessionBase } from '@common/interfaces/pure-and-base';
import { Inject, Injectable } from '@nestjs/common';
import { MySql2Database } from 'drizzle-orm/mysql2';
import { v4 as uuidv4 } from 'uuid';
import { and, eq, SQL } from 'drizzle-orm';
import { ISessionUpdate } from '@common/interfaces/with-child';

/** Репозиторий для работы с сущностью Sessions через Drizzle + mysql2 pool */
@Injectable()
export class SessionsRepositoryService {
  /**
   * Конструктор сервиса системы
   * @param db — Drizzle‑клиент для MySQL, инжектится из SystemModule под токеном 'DRIZZLE_DB_MYSQL_ONE'
   */
  constructor(
    @Inject('DRIZZLE_DB_MYSQL_ONE') private readonly db: MySql2Database
  ) {}

  /**
   * Создаёт новую сессию
   * @param {ISessionBase} sessionBase - Данные для создания сессии
   * @returns {Promise<RepositoryResult<null>>} - Результат создания сессии (true - успех | false - не получилось создать аккаунт)
   * @public
   */
  public async create(
    sessionBase: ISessionBase
  ): Promise<RepositoryResult<null>> {
    /** UUID_V4 идентификатор */
    const tempUuidV4 = uuidv4();
    /** Кол-во мс сейчас */
    const tempMilliseconds = Date.now();
    /** Формируем идентификатор вида uuid-v4_unixtime(13length) */
    const id = `${tempUuidV4}_${tempMilliseconds}`;

    /** Результат создания сессии */
    const resultCreated = await this.db.insert(sessionsSchema).values({
      id,
      ...sessionBase,
    });

    return {
      error: resultCreated[0].affectedRows ? false : true,
      data: null,
    };
  }

  /**
   * Читает сессию из таблицы СуБД
   * @param {RepositoryRead<ISessionFull>[]} arraySelectionConditions - Массив данных для чтения сессии из таблицы СуБД
   * @returns {Promise<RepositoryResult<ISessionFull | null>>} - Результат чтения сессии из таблицы СуБД
   * @public
   */
  public async readOneBySlug(
    arraySelectionConditions: RepositoryRead<ISessionFull>[]
  ): Promise<RepositoryResult<ISessionFull | null>> {
    for (const selectionCondition of arraySelectionConditions) {
      if (!selectionCondition.columnName || !selectionCondition.columnValue) {
        return {
          error: true,
          data: null,
        };
      }
    }

    /** Массив drizzle-условий типа eq(...) */
    const conditions = arraySelectionConditions.map((condition) => {
      const columnRef = sessionsSchema[condition.columnName];
      return eq(columnRef, condition.columnValue);
    });

    if (conditions.length === 0) {
      return { error: true, data: null };
    }

    /** Объединяем их через and(...) (рекурсивно, так как and принимает 2 аргумента) */
    const combinedCondition = conditions.reduce(
      (acc, curr): SQL<unknown> => and(acc, curr) as SQL<unknown>
    );

    /** Результат чтения сессии */
    const resultRead = await this.db
      .select()
      .from(sessionsSchema)
      .where(combinedCondition)
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
        accountId: resultRead[0].accountId as string,
        refreshToken: resultRead[0].refreshToken as string,
        ua: resultRead[0].ua as string,
        ip: resultRead[0].ip as string,
        browserData: resultRead[0].browserData as string,
        cpuArchitecture: resultRead[0].cpuArchitecture as string,
        deviceData: resultRead[0].deviceData as string,
        osData: resultRead[0].osData as string,
      },
    };
  }

  /**
   * Обновляет сессию по её ID
   * @param {ISessionUpdate} sessionUpdate - Данные сессии для обновления
   * @returns {Promise<RepositoryResult<null>>} - Результат работы метода обновления сессии
   * @public
   */
  public async update(
    sessionUpdate: ISessionUpdate
  ): Promise<RepositoryResult<null>> {
    /** Результат обновления сессии */
    const resultUpdated = await this.db
      .update(sessionsSchema)
      .set(sessionUpdate.sessionData)
      .where(eq(sessionsSchema.id, sessionUpdate.id));

    return {
      error: resultUpdated[0].affectedRows ? false : true,
      data: null,
    };
  }

  /**
   * Удаляет сессию по её ID
   * @param {string} sessionId - Идентификатор сессии (uuid_v4 + unixtime with ms) для удаления
   * @returns {Promise<RepositoryResult<null>} - Результат работы метода удаления сессии
   * @public
   */
  public async remove(sessionId: string): Promise<RepositoryResult<null>> {
    /** Результат удаления сессии */
    const resultDeleted = await this.db
      .delete(sessionsSchema)
      .where(eq(sessionsSchema.id, sessionId));

    return {
      error: resultDeleted[0].affectedRows ? false : true,
      data: null,
    };
  }
}
