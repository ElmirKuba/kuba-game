import { ISessionBase } from '@common/interfaces/pure-and-base';

/** Интефейс сессии для обновления */
export interface ISessionUpdate {
  /** Идентификатор сессии (uuid_v4 + unixtime with ms) для обновления */
  id: string;
  sessionData: ISessionBase;
}
