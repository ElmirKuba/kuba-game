import { AccountToOutputFrontend } from '@backend/dtos/output';

/** Интерфейс полезной нагрузки для генерации JWT токена */
export interface IPayloadForTokens {
  /** Экземпляр DTO аккаунта */
  accountDto: AccountToOutputFrontend;
  /** Тип JWT токена */
  tokenType?: 'refreshToken' | 'accessToken';
}
