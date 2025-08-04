import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuardService } from '../guards/auth-guard.service';

/** Мета-ключ для передачи по нему массива ролей */
export const METADATA_KEY_ROLES = 'METADATA_KEY_ROLES';

/** Метод возвращающий докератор проверки авторизации для доступа к REST API */
export const Auth = (...roles: string[]): MethodDecorator & ClassDecorator => {
  return applyDecorators(
    SetMetadata(METADATA_KEY_ROLES, roles),
    // ! UseGuards(AuthGuardService, RoleGuardService)
    UseGuards(AuthGuardService)
  );
};
