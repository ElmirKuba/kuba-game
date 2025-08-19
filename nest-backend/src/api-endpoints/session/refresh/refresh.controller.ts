import {
  Controller,
  Header,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { SessionRefreshUseCaseService } from '../../../use-cases-level/session/refresh/refresh.use-case.service';
import type { Response } from 'express';
import { ApiResult } from '../../../interfaces/api/api-interfaces';
import type { ReqWithCookies } from '../../../interfaces/systems/req-with-cookies.interface';

/** Контроллер REST-API связанного с функционалом обновления сессии */
@Controller('session')
export class ApiRefreshAccountController {
  /**
   * Конструктор контроллера системы
   * @param {SessionRefreshUseCaseService} sessionRefreshUseCaseService - Экземпляр сервиса модуля бизнес логики уровня UseCase обновления сессии
   */
  constructor(
    private sessionRefreshUseCaseService: SessionRefreshUseCaseService,
  ) {}

  /**
   * Метод обновления сессии
   * @param {Request} req - Попутные данные при запросе на данное REST API
   * @param {Response} res - Попутные данные при ответе от данного REST API
   * @returns {Promise<ApiResult<null>>} - Результат работы REST-API Post эндпоинта авторизации аккаунта
   * @public
   */
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @Header('Cache-Control', 'no-store')
  @Header('Pragma', 'no-cache')
  public async refresh(
    @Req() req: ReqWithCookies,
    @Res({ passthrough: true }) res: Response,
  ): Promise<ApiResult<null>> {
    const incomingRefreshToken = req.cookies?.refreshToken;

    if (!incomingRefreshToken) {
      throw new UnauthorizedException(
        'Вашему аккаунту не требуется выполнять обновление сессии, он не авторизован!',
      );
    }

    const resultRefreshSession =
      await this.sessionRefreshUseCaseService.refresh(incomingRefreshToken);

    // console.log(
    //   'ApiRefreshAccountController > refresh > resultRefreshSession',
    //   resultRefreshSession,
    // );

    return {
      error: false,
      data: null,
      errorMessages: [],
      successMessages: [],
    };
  }
}
