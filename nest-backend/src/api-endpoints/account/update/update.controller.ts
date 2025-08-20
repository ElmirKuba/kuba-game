import {
  Controller,
  Patch,
  HttpStatus,
  HttpCode,
  Body,
  Header,
} from '@nestjs/common';
import { AccountToUpdateDataDto } from '../../../dtos/input/account/account-to-input-data.dto';
import { Auth } from '../../../utility-level/decorators/auth.decorator';
import { AccountUpdateUseCaseService } from '../../../use-cases-level/account/update/update.use-case.service';
/** Контроллер REST-API связанный с функционалом чтения аккаунта */
@Controller('account')
export class ApiUpdateAccountController {
  /**
   * Конструктор контроллера системы
   * @param {AccountUpdateUseCaseService} accountUpdateUseCaseService - Экземпляр сервиса модуля бизнес логики уровня UseCase обновления аккаунта
   **/
  constructor(
    private accountUpdateUseCaseService: AccountUpdateUseCaseService,
  ) {}

  /**
   * Обновление данных аккаунтааккаунта
   * @param {AccountToUpdateDataDto} accountToUpdateDataDto - Данные для обновления аккаунта
   * @returns {Promise<ApiResult<null>>} - Результат работы REST-API Post эндпоинта создания аккаунта
   * @public
   */
  @Patch('update')
  @Auth()
  @HttpCode(HttpStatus.OK)
  @Header('Cache-Control', 'no-store')
  @Header('Pragma', 'no-cache')
  public async update(@Body() accountToUpdateDataDto: AccountToUpdateDataDto) {
    await this.accountUpdateUseCaseService.update(accountToUpdateDataDto);
  }
}
