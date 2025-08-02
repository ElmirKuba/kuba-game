/** Перечисление ошибок работы систем бизнес-логики */
export enum EnumerationErrorCodes {
  /** Код для уже существующего действия */
  ERROR_CODE_ALREADY_EXISTS = 'ERROR_CODE_ALREADY_EXISTS',
  /** Код для прочей ошибки */
  ERROR_CODE_INTERNAL_ERROR = 'ERROR_CODE_INTERNAL_ERROR',
  /** Код для отсутствия ошибки */
  ERROR_CODE_NULL = 'ERROR_CODE_NULL',
}
