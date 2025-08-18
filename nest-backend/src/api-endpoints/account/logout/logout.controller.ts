import {
  Controller,
  Header,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import type { Response } from 'express';
import { ApiResult } from '../../../interfaces/api/api-interfaces';
import { Auth } from '../../../utility-level/decorators/auth.decorator';
import type { ReqWithCookies } from '../../../interfaces/systems/req-with-cookies.interface';

/** Контроллер модуля REST-API связанного с функционалом выхода из аккаунта */
@Controller('account')
export class ApiLogoutAccountController {
  /**
   * Конструктор контроллера системы
   **/
  constructor() {}

  /**
   * Метод выхода из аккаунта
   * @param {Request} req - Попутные данные при запросе на данное REST API
   * @param {Response} res - Попутные данные при ответе от данного REST API
   * @returns {Promise<ApiResult<null>>} - Результат работы REST-API Post эндпоинта авторизации аккаунта
   * @public
   */
  @Post('logout')
  @Auth()
  @HttpCode(HttpStatus.OK)
  @Header('Cache-Control', 'no-store')
  @Header('Pragma', 'no-cache')
  public async logout(
    @Req() req: ReqWithCookies,
    @Res({ passthrough: true }) res: Response,
  ): Promise<ApiResult<null>> {
    const dsfsdf = req.cookies;
    console.log('dsfsdf', dsfsdf);

    return {
      error: false,
      data: null,
      errorMessages: [],
      successMessages: [],
    };
  }
}
