import { Injectable } from '@nestjs/common';
import { UseCaseResult } from '../../../interfaces/systems/use-case-result.interface';
import { EnumerationErrorCodes } from 'src/interfaces/systems/error-codes.interface';

/** Сервис модуля бизнес логики уровня UseCase выхода из аккаунта */
@Injectable()
export class AccountLogoutUseCaseService {
  /**
   * Конструктор сервиса системы
   */
  constructor() {}

  public async logout(refreshToken: string): Promise<UseCaseResult<null>> {
    console.log('1 refreshToken 2', refreshToken);

    return {
      error: false,
      successMessages: [],
      errorMessages: [],
      data: null,
      errorCode: EnumerationErrorCodes.ERROR_CODE_NULL,
    };
  }
}
