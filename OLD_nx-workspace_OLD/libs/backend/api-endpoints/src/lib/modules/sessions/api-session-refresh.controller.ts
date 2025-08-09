import { ApiResult } from '@backend/interfaces/api';
import { RefreshSessionService } from '@backend/sessions-and-tokens';
import {
  Controller,
  Header,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';

/** Контроллер REST-API обновления сессии */
@Controller('session')
export class ApiSessionRefreshController {
  /**
   * Конструктор контроллера системы
   * @param {RefreshSessionService} refreshSessionService - Экземпляр сервиса бизнес логики обновления сессии
   */
  constructor(private refreshSessionService: RefreshSessionService) {}

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
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ): Promise<ApiResult<null>> {
    /** Токен обновления пары токенов из куков */
    const incomingRefreshToken = req.cookies['refreshToken'];

    const resultRefresh = await this.refreshSessionService.refresh(
      incomingRefreshToken
    );

    console.log('::resultRefresh::', resultRefresh);

    return {
      error: false,
      data: null,
      errorMessages: [],
      successMessages: [],
    };
  }
}
