import { Injectable } from '@nestjs/common';
import { UseCaseResult } from '../../../interfaces/systems/use-case-result.interface';
import { EnumerationErrorCodes } from 'src/interfaces/systems/error-codes.interface';
import { DataForAuthAccount } from '../../../interfaces/pure-and-base/account/data-for-auth-account.interface';
import { AccountWithTokensAfterSuccessAuth } from '../../../interfaces/systems/account-with-tokens-after-success-auth.interface';
import { AccountReadManagerService } from '../../../managers-level/account/read/account-read.manager.service';
import { AccountAuthManagerService } from '../../../managers-level/account/auth/account-auth.manager.service';
import { IAccountFull } from '../../../interfaces/full/account/account-full.interface';
import { AccountToOutputFrontend } from '../../../dtos/output/account/account-to-input-data.dto';
import { GenerateTokensManagerService } from '../../../managers-level/tokens/generate-tokens/generate-tokens.manager.service';
import { IBrowser, ICPU } from 'ua-parser-js';

/** Сервис модуля бизнес логики уровня UseCase авторизации аккаунта */
@Injectable()
export class AccountAuthUseCaseService {
  /**
   * Конструктор сервиса системы
   * @param {AccountReadManagerService} accountReadManagerService - Экземпляр сервиса модуля бизнес логики уровня Manager чтения аккаунта
   * @param {AccountAuthManagerService} accountAuthManagerService - Экземпляр cервиса модуля бизнес логики уровня Manager авторизации аккаунта
   * @param {GenerateTokensManagerService} generateTokensManagerService - Экземпляр сервиса модуля бизнес логики уровня Manager связанных с генерацией токенов
   **/
  constructor(
    private accountReadManagerService: AccountReadManagerService,
    private accountAuthManagerService: AccountAuthManagerService,
    private generateTokensManagerService: GenerateTokensManagerService,
  ) {}

  public async auth(
    dataForAuthAccount: DataForAuthAccount,
  ): Promise<UseCaseResult<AccountWithTokensAfterSuccessAuth | null>> {
    /** Результат чтения аккаунта до момента его создания */
    const resultReadBeforeCreate =
      await this.accountReadManagerService.readBeforeAuth(
        dataForAuthAccount.dataForAuthCurrectAccount,
      );

    if (resultReadBeforeCreate.error) {
      return {
        ...resultReadBeforeCreate,
        data: null,
      };
    }

    /** Результат чтения аккаунта до момента его создания */
    const resultAuthExistingAccount =
      this.accountAuthManagerService.authExistingAccount(
        dataForAuthAccount.dataForAuthCurrectAccount,
        resultReadBeforeCreate.data as IAccountFull,
      );

    if (resultAuthExistingAccount.error) {
      return {
        ...resultAuthExistingAccount,
        data: null,
      };
    }

    /** Данные аккаунта без поля пароля для Frontend */
    const accountToOutputFromFrontendDto = new AccountToOutputFrontend(
      resultReadBeforeCreate.data,
    );

    /** Новая пара токенов */
    const pairTokens = this.generateTokensManagerService.generatePairTokens({
      accountDto: accountToOutputFromFrontendDto,
      userAgentData: dataForAuthAccount.userAgentData,
      userIp: dataForAuthAccount.userIp,
    });

    /** Данные браузера для сессии */
    const browserData = Object.values(
      dataForAuthAccount?.userAgentData?.browser as IBrowser,
    )
      .map((browserDataItem: string | undefined) => {
        return browserDataItem ?? '';
      })
      .join(' ');
    /** Данные процессора для сессии */
    const cpuArchitecture = Object.values(
      dataForAuthAccount?.userAgentData?.cpu as ICPU,
    )
      .map((cpuArchitectureItem: string | undefined) => {
        return cpuArchitectureItem ?? '';
      })
      .join(' ');
    /** Данные устройства для сессии */
    const deviceData = Object.values(
      dataForAuthAccount?.userAgentData?.device as ICPU,
    )
      .map((deviceDataItem: string | undefined) => {
        return deviceDataItem ?? '';
      })
      .join(' ');
    /** Данные операционной системы для сессии */
    const osData = Object.values(dataForAuthAccount?.userAgentData?.os as ICPU)
      .map((osDataItem: string | undefined) => {
        return osDataItem ?? '';
      })
      .join(' ');

    console.log('передать на создание сессии в менеджер уровень сессий', {
      accountId: resultReadBeforeCreate.data?.id as string,
      browserData,
      cpuArchitecture,
      deviceData,
      ip: dataForAuthAccount.userIp,
      osData,
      refreshToken: pairTokens.refreshToken,
      ua: dataForAuthAccount.userAgentData?.ua,
    });

    /*
    {
      accountId: '57fe7c6d-850c-4020-bc4b-0705f9779546_1755020932409',
      browserData: 'Opera 120.0.0.0 120 ',
      cpuArchitecture: '',
      deviceData: ' Macintosh Apple',
      ip: '192.168.97.1',
      osData: 'macOS 10.15.7',
      refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50RHRvIjp7ImlkIjoiNTdmZTdjNmQtODUwYy00MDIwLWJjNGItMDcwNWY5Nzc5NTQ2XzE3NTUwMjA5MzI0MDkiLCJsb2dpbiI6IlRlc3RBY2NvdW50In0sInVzZXJBZ2VudERhdGEiOnsidWEiOiJNb3ppbGxhLzUuMCAoTWFjaW50b3NoOyBJbnRlbCBNYWMgT1MgWCAxMF8xNV83KSBBcHBsZVdlYktpdC81MzcuMzYgKEtIVE1MLCBsaWtlIEdlY2tvKSBDaHJvbWUvMTM1LjAuMC4wIFNhZmFyaS81MzcuMzYgT1BSLzEyMC4wLjAuMCIsImJyb3dzZXIiOnsibmFtZSI6Ik9wZXJhIiwidmVyc2lvbiI6IjEyMC4wLjAuMCIsIm1ham9yIjoiMTIwIn0sImNwdSI6e30sImRldmljZSI6eyJtb2RlbCI6Ik1hY2ludG9zaCIsInZlbmRvciI6IkFwcGxlIn0sImVuZ2luZSI6eyJuYW1lIjoiQmxpbmsiLCJ2ZXJzaW9uIjoiMTM1LjAuMC4wIn0sIm9zIjp7Im5hbWUiOiJtYWNPUyIsInZlcnNpb24iOiIxMC4xNS43In19LCJ1c2VySXAiOiIxOTIuMTY4Ljk3LjEiLCJ0b2tlblR5cGUiOiJyZWZyZXNoVG9rZW4iLCJpYXQiOjE3NTUwMjQ5NjYsImV4cCI6MTc1NzYxNjk2Nn0.t_SwhoNHLB5QfCn_dTRodqK6scQEpo6ijN52k8OGUVo',
      ua: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36 OPR/120.0.0.0'
    }
    */

    return {
      error: false,
      data: {
        account: null,
      },
      errorCode: EnumerationErrorCodes.ERROR_CODE_NULL,
      errorMessages: [],
      successMessages: [],
    };
  }
}
