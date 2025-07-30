import { IAccountPure } from '@common/interfaces/pure-and-base';

/** Полный интерфейс аккаунта */
export interface IAccountFull extends IAccountPure {
  /** Идентификатор аккаунта (uuid_v4 + unixtime with ms) */
  id: string;
}
