import { AccountToOutputFrontend } from '@backend/dtos/output';
import { IResult } from 'ua-parser-js';

/** Интерфейс полезной нагрузки для генерации JWT токена */
export interface IPayloadForTokens {
  /** Экземпляр DTO аккаунта */
  accountDto: AccountToOutputFrontend;
  /** Данные парсинга user-agent */
  userAgentData?: IResult;
  /** IP-адрес пользователя */
  userIp?: string;
  /** Тип JWT токена */
  tokenType?: 'refreshToken' | 'accessToken';
}
