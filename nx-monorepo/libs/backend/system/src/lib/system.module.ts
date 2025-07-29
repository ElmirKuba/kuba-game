import { Module } from '@nestjs/common';
import { DrizzleMySqlModule } from '@knaadh/nestjs-drizzle-mysql2';
import { accountsMySQLTable } from '@backend/accounts';
import { SystemService } from './system.service';
import { SystemController } from './system.controller';

/** Системный модуль приложения. */
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
        schema: { accountsMySQLTable },
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
