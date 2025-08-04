import { ApiResult } from '@backend/interfaces/api';
import { AccountLogoutService } from '@backend/systems/account-logics';
import {
  Controller,
  Header,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Auth } from '@backend/guards';

/** Контроллер REST-API выхода из аккунта */
@Controller('account')
export class ApiLogoutAccountController {
  /**
   * Конструктор контроллера системы
   * @param {AccountLogoutService} accountLogoutService - Сервис бизнес логики выхода из аккаунта
   **/
  constructor(private accountLogoutService: AccountLogoutService) {}

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
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ): Promise<ApiResult<null>> {
    /** Токен обновления пары токенов из куков */
    const incomingRefreshToken = req.cookies['refreshToken'];

    const resultLogout = await this.accountLogoutService.logout(
      incomingRefreshToken
    );

    const result: ApiResult<null> = {
      error: resultLogout.error,
      errorMessages: resultLogout.errorMessages,
      successMessages: resultLogout.successMessages,
      data: resultLogout.data,
    };

    if (resultLogout.error) {
      throw new HttpException(result, HttpStatus.UNAUTHORIZED);
    }

    res.clearCookie('accessToken', {
      httpOnly: true,
      secure: process.env['NODE_ENV'] === 'production',
      sameSite: 'lax',
      path: '/',
    });
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: process.env['NODE_ENV'] === 'production',
      sameSite: 'lax',
      path: '/',
    });

    return result;
  }
}
