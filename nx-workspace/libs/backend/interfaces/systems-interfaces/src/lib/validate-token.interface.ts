import { IPayloadForTokens } from '@common/interfaces/tokens';
import { SystemResult } from './systems-result.interface';

/** Результаты валидации JWT токена */
export interface IValidateToken
  extends Pick<
    SystemResult,
    'error' | 'errorCode' | 'successMessages' | 'errorMessages'
  > {
  /** Данные валидации JWT токена */
  data:
    | (Partial<{
        iat: number;
        exp: number;
      }> &
        IPayloadForTokens)
    | null;
}
