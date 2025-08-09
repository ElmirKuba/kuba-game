import { AdapterResultRepo } from '@backend/interfaces/adapters';
import {
  RepositoryRead,
  RepositoryResult,
} from '@backend/interfaces/orm-repositories';
import { SessionsRepositoryService } from '@backend/orm-repositories';
import { ISessionFull } from '@common/interfaces/full';
import { ISessionBase } from '@common/interfaces/pure-and-base';
import { ISessionUpdate } from '@common/interfaces/with-child';
import { Injectable } from '@nestjs/common';

/** Сервис модуля адаптера репозитория для сессий */
@Injectable()
export class SessionAdapterService {
  /**
   * Конструктор сервиса системы
   * @param {SessionsRepositoryService} sessionsRepositoryService — Экземпляр репозитория для работы с сущностью Sessions
   */
  constructor(private sessionsRepositoryService: SessionsRepositoryService) {}

  /**
   * Создаёт новую сессию
   * @param {ISessionBase} sessionBase - Данные для создания сессии
   * @returns {Promise<AdapterResultRepo<null>>} - Результат создания сессии (true - успех | false - не получилось создать аккаунт)
   * @public
   */
  public async create(
    sessionBase: ISessionBase
  ): Promise<AdapterResultRepo<null>> {
    /** Результаты создания сессии */
    const resultCreate: RepositoryResult<null> =
      await this.sessionsRepositoryService.create(sessionBase);

    return {
      error: resultCreate.error,
      adapt: resultCreate.data,
    };
  }

  /**
   * Читает сессию из таблицы СуБД
   * @param {RepositoryRead<ISessionFull>[]} arraySelectionConditions - Массив данных для чтения сессии из таблицы СуБД
   * @returns {Promise<AdapterResultRepo<ISessionFull | null>>} - Результат чтения сессии из таблицы СуБД
   * @public
   */
  public async readOneBySlug(
    arraySelectionConditions: RepositoryRead<ISessionFull>[]
  ): Promise<AdapterResultRepo<ISessionFull | null>> {
    /** Результаты чтения аккаунта */
    const resultRead: RepositoryResult<ISessionFull | null> =
      await this.sessionsRepositoryService.readOneBySlug(
        arraySelectionConditions
      );

    return {
      error: resultRead.error,
      adapt: resultRead.data,
    };
  }

  /**
   * Обновляет сессию по её ID
   * @param {ISessionUpdate} sessionUpdate - Данные сессии для обновления
   * @returns {Promise<AdapterResultRepo<null>>} - Результат работы метода обновления сессии
   * @public
   */
  public async update(
    sessionUpdate: ISessionUpdate
  ): Promise<AdapterResultRepo<null>> {
    const resultUpdate: RepositoryResult<null> =
      await this.sessionsRepositoryService.update({
        id: sessionUpdate.id,
        sessionData: sessionUpdate.sessionData,
      });

    return {
      error: resultUpdate.error,
      adapt: resultUpdate.data,
    };
  }

  /**
   * Удаляет сессию по её ID
   * @param {string} sessionId - Идентификатор сессии (uuid_v4 + unixtime with ms) для удаления
   * @returns {Promise<AdapterResultRepo<null>} - Результат работы метода удаления сессии
   * @public
   */
  public async remove(sessionId: string): Promise<AdapterResultRepo<null>> {
    const resultRemove: RepositoryResult<null> =
      await this.sessionsRepositoryService.remove(sessionId);

    return {
      error: resultRemove.error,
      adapt: resultRemove.data,
    };
  }
}
