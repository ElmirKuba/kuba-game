import { SystemResult } from '../systems/systems-result.interface';

/** Интерфейс ответа от API */
export type ApiResult<ResultType = Record<string, unknown>> = Pick<
  SystemResult<ResultType>,
  'error' | 'successMessages' | 'errorMessages' | 'data'
>;
