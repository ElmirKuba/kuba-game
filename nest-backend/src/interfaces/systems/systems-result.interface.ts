import { EnumerationErrorCodes } from './error-codes.interface';

/** Результат работы системы */
export interface SystemResult<ResultType = Record<string, unknown>> {
  /** Признак наличия или отсутствия ошибки работы системы с репозиторием */
  error: boolean;
  /** Код ошибки при наличии */
  errorCode: EnumerationErrorCodes;
  /** Массив сообщений ошибок */
  errorMessages: string[];
  /** Массив сообщений успеха */
  successMessages: string[];
  /** Непосредственно результат работы системы */
  data: ResultType;
}
