/** Результат работы системы */
export interface SystemResult {
  /** Признак наличия или отсутствия ошибки работы системы с репозиторием */
  error: boolean;
  /** Массив сообщений ошибок */
  errorMessages: string[];
  /** Массив сообщений успеха */
  successMessages: string[];
  /** Непосредственно результат работы системы */
  data: null;
}
