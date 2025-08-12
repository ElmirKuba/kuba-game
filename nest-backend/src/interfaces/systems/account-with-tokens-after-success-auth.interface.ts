import { IAccountWithoutPassword } from '../full/account/account-without-password.interface';

/** Данные аккаунта и сгенерированные токены от бизнес логики уровня Use-Case сервиса авторизации аккаунта */
export interface AccountWithTokensAfterSuccessAuth {
  /** Данные аккаунта без пароля */
  account: IAccountWithoutPassword | null;
  /** Пара токенов сгенерированная после успешной авторизации */
  // tokens: IPairTokens;
}
