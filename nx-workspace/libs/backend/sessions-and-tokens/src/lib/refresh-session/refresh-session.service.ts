import {
  EnumerationErrorCodes,
  SystemResult,
} from '@backend/interfaces/systems';
import { SessionsRepositoryService } from '@backend/orm-repositories';
import { Injectable, Logger } from '@nestjs/common';
import { ValidateTokensService } from '../validate-tokens/validate-tokens.service';

/** Сервис модуля для работы с обновлением сессии */
@Injectable()
export class RefreshSessionService {
  /**
   * Логгер NestJS для вывода сообщений в консоль.
   * @protected
   */
  private readonly logger = new Logger(RefreshSessionService.name);

  /**
   * Конструктор сервиса системы
   * @param {SessionsRepositoryService} sessionsRepositoryService — Экземпляр репозитория для работы с сущностью Sessions
   * @param {ValidateTokensService} validateTokensService — Экземпляр сервиса модуля валидации JWT токенов
   */
  constructor(
    private sessionsRepositoryService: SessionsRepositoryService,
    private validateTokensService: ValidateTokensService // private accountReadService: AccountReadService
  ) {}

  /**
   * Метод выхода обновления сессии
   * @param {string} refreshToken - Токен обновления пары токенов для выхода из аккаунта
   * @returns {Promise<SystemResult<null>>} - Результаты работы метода выхода из аккаунта
   * @public
   */
  public async refresh(refreshToken: string): Promise<SystemResult<null>> {
    /** Массив сообщений для ошибок */
    const errorMessages: string[] = [];
    /** Массив сообщений для успеха */
    const successMessages: string[] = [];

    if (!refreshToken) {
      errorMessages.push(
        'Обновление сессии не доступна, активная сессия не найдена!'
      );

      return {
        error: true,
        errorCode: EnumerationErrorCodes.ERROR_CODE_IS_INCORRECT,
        data: null,
        errorMessages,
        successMessages,
      };
    }

    /** Результат нахождения сессии в таблице сессий в СуБД */
    const resultRead = await this.sessionsRepositoryService.readOneBySlug([
      {
        columnName: 'refreshToken',
        columnValue: refreshToken,
      },
    ]);

    if (resultRead.error) {
      errorMessages.push(
        'Обновление сессии не доступна, активная сессия не найдена!'
      );

      return {
        error: true,
        errorCode: EnumerationErrorCodes.ERROR_CODE_NOT_EXISTS,
        successMessages,
        errorMessages,
        data: null,
      };
    }

    const resultValidate = this.validateTokensService.validateAnyToken(
      refreshToken,
      'refreshToken'
    );

    if (resultValidate.error) {
      resultValidate.errorMessages.forEach((message) => {
        if (message.includes('jwt expired')) {
          errorMessages.push(
            'Время авторизации аккаунта истекло, пожалуйста, пройдите на страницу авторизации, введите логин и пароль, затем попробуйте получить доступ к нужному вам функционалу еще раз!'
          );
        } else {
          errorMessages.push(
            'Обновление сессии не возможно, скорее всего ваша сессия может быть подделана!'
          );
        }
      });

      return {
        error: true,
        errorCode: EnumerationErrorCodes.ERROR_CODE_IS_INCORRECT,
        errorMessages,
        successMessages,
        data: null,
      };
    }

    // const resultReadAccount: SystemResult<IAccountFull | null> =
    //   await this.accountReadService.readOneBySlug({
    //     key: 'id',
    //     value: resultValidate.data?.accountDto.id as string,
    //   });

    // console.log('::resultReadAccount::>', resultReadAccount);

    return {
      error: false,
      data: null,
      errorCode: EnumerationErrorCodes.ERROR_CODE_NULL,
      errorMessages,
      successMessages,
    };
  }
}
