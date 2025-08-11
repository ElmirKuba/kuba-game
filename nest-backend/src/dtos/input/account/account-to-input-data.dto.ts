import { IsString, Length } from 'class-validator';
import { IAccountPure } from '../../../interfaces/pure-and-base/account/account-pure.interface';

/** DTO для создания аккаунта или авторизации аккаунта */
export class AccountToInputDataDto implements IAccountPure {
  /** Конструктор класса DTO создания аккаунта */
  constructor() {
    this.login = '';
    this.password = '';
  }

  @IsString({
    message: 'Логин аккаунта должен быть строкой',
  })
  @Length(3, 20, {
    message: 'Логин должен быть от 3 до 20 символов',
  })
  login: string;

  @IsString({
    message: 'Пароль аккаунта должен быть строкой',
  })
  @Length(3, 30, {
    message: 'Пароль должен быть от 3 до 30 символов',
  })
  password: string;
}
