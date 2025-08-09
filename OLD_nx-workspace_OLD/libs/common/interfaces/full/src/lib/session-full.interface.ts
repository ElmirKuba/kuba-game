import { ISessionBase } from '@common/interfaces/pure-and-base';

/** Полный интефейс сессии */
export interface ISessionFull extends ISessionBase {
  /** Идентификатор сессии (uuid_v4 + unixtime with ms) */
  id: string;
}
