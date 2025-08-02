import { SystemResult } from '@backend/interfaces/systems';

/** Интерфейс ответа от API */
export type ApiResult<ResultType = Record<string, unknown>> = Pick<
  SystemResult<ResultType>,
  'error' | 'successMessages' | 'errorMessages' | 'data'
>;
