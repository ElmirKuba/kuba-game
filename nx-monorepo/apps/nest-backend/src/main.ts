import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { watch } from 'fs';
import { resolve } from 'path';
import { execSync } from 'child_process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const globalPrefix = 'api';

  app.setGlobalPrefix(globalPrefix);

  const port = process.env.PORT || 3000;

  await app.listen(port);

  Logger.log(
    `🚀 Nest Backend для проекта KubaGame запущен и слушает: http://localhost:${port}/${globalPrefix}`
  );

  // TODO: ElmirKuba 2025-07-29: Сделать апишку, которая запускает миграции схем в базу данных и работает только в dev режиме
  watch(resolve(process.cwd()), { recursive: true }, (eventType, fileName) => {
    if (fileName && fileName.includes('schema')) {
      console.log('🔍 Обнаружено изменение в schema-файле:');
      console.log('  📂 Тип события:', eventType);
      console.log('  📄 Имя файла:', fileName);

      const output = execSync('npm run drizzle:push', {
        encoding: 'utf-8', // для корректного отображения кириллицы
        stdio: 'pipe', // можно заменить на 'inherit' для прямого вывода
      });

      console.log('✅ drizzle:push завершено:');
      console.log(output);
    }
  });
}

bootstrap();
