import { IAccountFull, IAccountWithoutPassword } from '@common/interfaces/full';

/** DTO для создания аккаунта */
export class AccountToOutputFrontend implements IAccountWithoutPassword {
  id: string;
  login: string;

  constructor(accountToTransformToDto: IAccountFull | null) {
    if (!accountToTransformToDto) {
      this.id = '';
      this.login = '';
      return;
    }

    this.id = accountToTransformToDto.id;
    this.login = accountToTransformToDto.login;
  }
}
