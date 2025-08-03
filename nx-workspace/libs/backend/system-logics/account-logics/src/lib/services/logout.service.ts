import {
  EnumerationErrorCodes,
  SystemResult,
} from '@backend/interfaces/systems';
import { Injectable, Logger } from '@nestjs/common';

/** Сервис модуля системы выхода из аккаунтов */
@Injectable()
export class AccountLogoutService {
  /**
   * Логгер NestJS для вывода сообщений в консоль.
   * @protected
   */
  private readonly logger = new Logger(AccountLogoutService.name);

  /**
   * Конструктор сервиса системы
   */
  constructor() {}

  /**
   * Метод выхода из аккаунта
   * @param {string} refreshToken - Токен обновления пары токенов для выхода из аккаунта
   * @returns {Promise<SystemResult<null>>} - Результаты работы метода выхода из аккаунта
   * @public
   */
  public async logout(refreshToken: string): Promise<SystemResult<null>> {
    /** Массив сообщений для ошибок */
    const errorMessages: string[] = [];
    /** Массив сообщений для успеха */
    const successMessages: string[] = [];

    if (!refreshToken) {
      errorMessages.push(
        'Выход из аккаунта не требуется, активная сессия не найдена!'
      );

      return {
        error: true,
        errorCode: EnumerationErrorCodes.ERROR_CODE_IS_INCORRECT,
        data: null,
        errorMessages,
        successMessages,
      };
    }

    console.log('refreshToken в сервисе выхода', refreshToken);

    /**
     * TODO: 1. Мы уже получаем refreshToken суда в сервис добыв из куков в контроллере
     * TODO: 2. По пути "nx-workspace/libs/backend/sessions-and-tokens/src/lib" сделать remove-session и положить туда модуль и сервис
     * TODO: 3. В новом модуле поставить сервис доступный к экспорту
     * TODO: 4. В index сделать доступным к импорту в иных местах кроме этой либы модуль
     * TODO: 5. В index сделать доступным к импорту в иных местах кроме этой либы сервис
     * TODO: 6. Заюзать модуль в модуле к которому относится этот сервис
     * TODO: 7. Инжектить сервис суда
     * TODO: 8. Передать рефреш токен туда на сервис
     * TODO: 9. В сервисе искать в бд и если найден удалить
     * TODO: 10. Если не найден вернуть ошибку
     * TODO: 11. Здесь обработать ошибку если не найден токен, значит сессии с таким токеном нет, выходить не от куда
     */

    return {
      error: false,
      data: null,
      errorCode: EnumerationErrorCodes.ERROR_CODE_NULL,
      errorMessages,
      successMessages,
    };
  }
}
