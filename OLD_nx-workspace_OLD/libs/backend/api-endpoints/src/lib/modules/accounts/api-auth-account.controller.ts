import { AccountAuthService } from '@backend/systems/account-logics';
import {
  Body,
  Controller,
  Header,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { AccountToInputDataDto } from '@backend/dtos/input';
import { Request, Response } from 'express';
import { IResult, UAParser } from 'ua-parser-js';
import { IAccountWithoutPassword } from '@common/interfaces/full';
import { ApiResult } from '@backend/interfaces/api';

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
   * @param {Request} req - Попутные данные при запросе на данное REST API
   * @param {Response} res - Попутные данные при ответе от данного REST API
   * @param {AccountToInputDataDto} accountToInputDataDto - Данные авторизации аккаунта от клиента
   * @returns {Promise<ApiResult<IAccountWithoutPassword>>} - Результат работы REST-API Post эндпоинта авторизации аккаунта
   * @public
   */
  @Post('auth')
  @HttpCode(HttpStatus.OK)
  @Header('Cache-Control', 'no-store')
  @Header('Pragma', 'no-cache')
  public async auth(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @Body() accountToInputDataDto: AccountToInputDataDto
  ): Promise<ApiResult<IAccountWithoutPassword>> {
    /** IP вызывающего REST API */
    let userIp =
      req.headers['x-forwarded-for']?.toString() || req.socket.remoteAddress;

    if (typeof userIp === 'string' && userIp.startsWith('::ffff:')) {
      userIp = userIp.replace('::ffff:', '');
    }

    /** User-Agent */
    const userAgent = req.headers['user-agent'] || '';
    /** Парсер User-Agent */
    const parser = new UAParser(userAgent);
    /** Распарсенные данные user-agent пользователя */
    const userAgentData: IResult = parser.getResult();

    /** Результат авторизации аккаунта */
    const resultAuth = await this.accountAuthService.auth({
      dataForAuthCurrectAccount: accountToInputDataDto,
      userAgentData,
      userIp,
    });

    const returned: ApiResult<IAccountWithoutPassword> = {
      error: resultAuth.error,
      successMessages: resultAuth.successMessages,
      errorMessages: resultAuth.errorMessages,
      data: resultAuth.data?.account as IAccountWithoutPassword,
    };

    if (resultAuth.error || !resultAuth.data) {
      throw new HttpException(returned, HttpStatus.UNAUTHORIZED);
    }

    const { accessToken, refreshToken } = resultAuth.data.tokens;

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env['NODE_ENV'] === 'production',
      sameSite: 'lax',
      maxAge: 1000 * 20,
      path: '/',
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env['NODE_ENV'] === 'production',
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24 * 30,
      path: '/',
    });

    return returned;
  }
}
