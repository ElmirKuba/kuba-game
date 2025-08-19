import { Injectable } from '@nestjs/common';

/** Сервис модуля бизнес логики уровня UseCase обновления сессии */
@Injectable()
export class SessionRefreshUseCaseService {
  /**
   * Конструктор сервиса системы
   * @param {}  - Экземпляр
   */
  constructor() {}

  /**
   * Метод обновления сессии
   * @param {string} refreshToken - Токен обновления пары токенов JWT
   * @returns {} - Результат обновления пары токенов JWT
   * @public
   */
  public async refresh(refreshToken: string) {
    console.log(
      'SessionRefreshUseCaseService > refresh > refreshToken',
      refreshToken,
    );
  }
}
