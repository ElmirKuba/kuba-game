import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getData(): { message: string } {
    return {
      message:
        'Привет, я просто ответ от стандартной апишки сгенерированной nx!',
    };
  }
}
