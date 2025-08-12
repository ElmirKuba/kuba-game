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
import type { Request, Response } from 'express';
import { AccountToInputDataDto } from '../../../dtos/input/account/account-to-input-data.dto';
import { ApiResult } from '../../../interfaces/api/api-interfaces';
import { IAccountWithoutPassword } from '../../../interfaces/full/account/account-without-password.interface';
import { AccountAuthUseCaseService } from '../../../use-cases-level/account/auth/account-auth.use-case.service';
import { IResult, UAParser } from 'ua-parser-js';

/** Контроллер модуля REST-API связанного с функционалом авторизации аккаунта */
@Controller('account')
export class ApiAuthAccountController {
  /**
   * Конструктор контроллера системы
   * @param {AccountAuthUseCaseService} accountAuthUseCaseService - Экземпляр сервиса модуля бизнес логики уровня UseCase авторизации аккаунта
   */
  constructor(private accountAuthUseCaseService: AccountAuthUseCaseService) {}

  @Post('auth')
  @HttpCode(HttpStatus.OK)
  @Header('Cache-Control', 'no-store')
  @Header('Pragma', 'no-cache')
  public async auth(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @Body() accountToInputDataDto: AccountToInputDataDto,
  ): Promise<ApiResult<IAccountWithoutPassword | null>> {
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
    const resultAuth = await this.accountAuthUseCaseService.auth({
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

    // const { accessToken, refreshToken } = resultAuth.data.tokens;

    // res.cookie('accessToken', accessToken, {
    //   httpOnly: true,
    //   secure: process.env['NODE_ENV'] === 'production',
    //   sameSite: 'lax',
    //   maxAge: 1000 * 20,
    //   path: '/',
    // });
    // res.cookie('refreshToken', refreshToken, {
    //   httpOnly: true,
    //   secure: process.env['NODE_ENV'] === 'production',
    //   sameSite: 'lax',
    //   maxAge: 1000 * 60 * 60 * 24 * 30,
    //   path: '/',
    // });

    return returned;
  }
}
