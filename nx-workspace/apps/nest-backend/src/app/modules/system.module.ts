import { Module } from '@nestjs/common';
import { SystemController } from './system.controller';
import { SystemService } from './system.service';
import { DrizzleMySqlModule } from '@knaadh/nestjs-drizzle-mysql2';
import { accountsSchema } from '@backend/orm-schemas';

/** Основной системный модуль приложения NestJS */
@Module({
  imports: [
    DrizzleMySqlModule.register({
      tag: 'DRIZZLE_DB_MYSQL_ONE',
      mysql: {
        connection: 'pool',
        config: {
          host: process.env['MYSQL_HOST_AND_NAME_DATABASE'],
          port: Number(process.env['MYSQL_PORT']),
          user: process.env['MYSQL_USER'],
          password: process.env['MYSQL_PASSWORD'],
          database: process.env['MYSQL_HOST_AND_NAME_DATABASE'],
          charset: 'utf8',
        },
      },
      config: {
        schema: { accountsSchema },
        mode: 'default',
        casing: 'camelCase',
      },
    }),
  ],
  exports: [],
  controllers: [SystemController],
  providers: [SystemService],
})
export class SystemModule {}
