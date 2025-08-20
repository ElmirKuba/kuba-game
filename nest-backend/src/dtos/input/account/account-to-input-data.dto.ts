import {
  IsDefined,
  IsObject,
  IsString,
  Length,
  Matches,
  ValidateNested,
} from 'class-validator';
import { IAccountPure } from '../../../interfaces/pure-and-base/account/account-pure.interface';
import { IAccountUpdate } from '../../../interfaces/with-child/account/account-update.interface';
import { Type } from 'class-transformer';
import { PartialType } from '@nestjs/mapped-types';

/** DTO для создания аккаунта или авторизации аккаунта */
export class AccountToInputDataDto implements IAccountPure {
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

/** Все поля из AccountToInputDataDto становятся опциональными */
export class AccountToUpdateDto extends PartialType(AccountToInputDataDto) {}

/** DTO для обновления аккаунта */
export class AccountToUpdateDataDto implements IAccountUpdate {
  @IsString({ message: 'ID должен быть строкой' })
  @Matches(
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}_[0-9]{13}$/,
    {
      message:
        'ID должен быть в формате uuidv4_unixtime13 (например: 550e8400-e29b-41d4-a716-446655440000_1700000000000)',
    },
  )
  id: string;

  @IsDefined({ message: 'accountData обязательно' })
  @IsObject({ message: 'accountData должен быть объектом' })
  @ValidateNested()
  @Type(() => AccountToUpdateDto)
  accountData: AccountToUpdateDto;
}
