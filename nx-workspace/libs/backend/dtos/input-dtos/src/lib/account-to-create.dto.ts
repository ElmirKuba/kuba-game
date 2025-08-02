import { IAccountPure } from '@common/interfaces/pure-and-base';
import { IsString, Length } from 'class-validator';

/** DTO для создания аккаунта */
export class AccountToCreateDto implements IAccountPure {
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
