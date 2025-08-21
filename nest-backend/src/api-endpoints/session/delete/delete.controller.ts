import {
  Controller,
  Delete,
  Header,
  HttpCode,
  HttpException,
  HttpStatus,
  Query,
  Req,
} from '@nestjs/common';
import { Auth } from '../../../utility-level/decorators/auth.decorator';
import type { ReqWithCookies } from '../../../interfaces/systems/req-with-cookies.interface';
import { SessionDeleteUseCaseService } from '../../../use-cases-level/session/delete/delete.use-case.service';
import { ISessionFull } from '../../../interfaces/full/session/session-full.interface';
import { ApiResult } from '../../../interfaces/api/api-interfaces';

/** Контроллер модуля REST-API связанного с функционалом удаления других своих сессий */
@Controller('session')
export class ApiDeleteSessionsController {
  /**
   * Конструктор контроллера системы
   * @param {SessionDeleteUseCaseService} sessionDeleteUseCaseService - Сервис модуля бизнес логики уровня UseCase удаления сессий
   **/
  constructor(
    private sessionDeleteUseCaseService: SessionDeleteUseCaseService,
  ) {}

  /**
   * Метод удаления своей сесии по его идентификатору
   * @param {ReqWithCookies} req - Попутные данные при запросе на данное REST API
   * @param {string} sessionIdForDeleted - Идентификатор сессии для удаления из Query-param
   * @returns {}
   * @public
   */
  @Delete('delete')
  @Auth()
  @HttpCode(HttpStatus.OK)
  @Header('Cache-Control', 'no-store')
  @Header('Pragma', 'no-cache')
  public async deleteById(
    @Req() req: ReqWithCookies,
    @Query(`id`) sessionIdForDeleted: string,
  ) {
    /** Токен обновления пары токенов текущей сесиии */
    const incomingRefreshTokenCurrentSession = req.cookies?.refreshToken;
    /** Идентификатор аккаунта  */
    const accountId = req.authData?.accountDto.id;

    /** Результаты чтения сессий */
    const resultDeleted = await this.sessionDeleteUseCaseService.deleteById(
      sessionIdForDeleted,
      accountId as string,
      incomingRefreshTokenCurrentSession,
    );

    const returned: ApiResult<ISessionFull | null> = {
      error: resultDeleted.error,
      successMessages: resultDeleted.successMessages,
      errorMessages: resultDeleted.errorMessages,
      data: resultDeleted.data,
    };

    if (resultDeleted.error || !resultDeleted.data) {
      // TODO: ElmirKuba 2025-08-20: Разобраться NOT_FOUND тут или ветвление как в апи создания пароля
      throw new HttpException(returned, HttpStatus.FORBIDDEN);
    }

    return returned;
  }
}
