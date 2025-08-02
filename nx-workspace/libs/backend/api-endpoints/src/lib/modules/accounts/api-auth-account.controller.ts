import { AccountAuthService } from '@backend/systems/account-logics';
import { Body, Controller, Post } from '@nestjs/common';
import { AccountToInputDataDto } from '@backend/dtos/input';

/** Контроллер REST-API авторизации аккунта */
@Controller('account')
export class ApiAuthAccountController {
  /**
   * Конструктор контроллера системы
   * @param {AccountAuthService} accountAuthService - Сервис бизнес логики авторизации аккаунта
   **/
  constructor(private accountAuthService: AccountAuthService) {}

  /**
   * Автооризация текущего аккаунта
   * @returns {Promise<void>} - Результат работы REST-API Post эндпоинта авторизации аккаунта
   * @public
   */
  @Post('auth')
  public async auth(
    @Body() accountToInputDataDto: AccountToInputDataDto
  ): Promise<void> {
    /** Результат авторизации аккаунта */
    const resultAuth = await this.accountAuthService.auth(
      accountToInputDataDto
    );

    console.log('resultAuth11::>', resultAuth);

    return;
  }
}
