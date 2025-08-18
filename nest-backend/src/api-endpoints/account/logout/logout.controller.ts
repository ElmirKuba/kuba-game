import {
  Controller,
  Header,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import type { Response } from 'express';
import { ApiResult } from '../../../interfaces/api/api-interfaces';
import { Auth } from '../../../utility-level/decorators/auth.decorator';
import type { ReqWithCookies } from '../../../interfaces/systems/req-with-cookies.interface';
import { AccountLogoutUseCaseService } from '../../../use-cases-level/account/logout/logout.use-case.service';

/** Контроллер модуля REST-API связанного с функционалом выхода из аккаунта */
@Controller('account')
export class ApiLogoutAccountController {
  /**
   * Конструктор контроллера системы
   * @param {AccountLogoutUseCaseService} accountLogoutUseCaseService - Экземпляр сервиса модуля бизнес логики уровня UseCase выхода из аккаунта
   **/
  constructor(
    private accountLogoutUseCaseService: AccountLogoutUseCaseService,
  ) {}

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
    const incomingRefreshToken = req.cookies?.refreshToken;

    if (!incomingRefreshToken) {
      throw new UnauthorizedException(
        'Вашему аккаунту не требуется выполнять выход, он не авторизован!',
      );
    }

    const resultLogout =
      await this.accountLogoutUseCaseService.logout(incomingRefreshToken);

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
