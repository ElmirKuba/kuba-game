import {
  Controller,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { Auth } from '../../../utility-level/decorators/auth.decorator';
import type { ReqWithCookies } from '../../../interfaces/systems/req-with-cookies.interface';

/** Контроллер REST-API связанного с функционалом обновления сессии */
@Controller('session')
export class ApiReadSessionController {
  /**
   * Конструктор контроллера системы
   */
  constructor() {}

  /**
   * REST API Получение всех сессий текущего аккаунта
   */
  @Get('read-list')
  @Auth()
  @HttpCode(HttpStatus.OK)
  @Header('Cache-Control', 'no-store')
  @Header('Pragma', 'no-cache')
  public async readList(@Req() req: ReqWithCookies) {
    /** Идентификатор аккаунта  */
    const accountId = req.authData?.accountDto.id;

    console.log('Я выполнился!', accountId);
  }
}
