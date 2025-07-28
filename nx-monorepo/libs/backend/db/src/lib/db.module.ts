import { Module } from '@nestjs/common';
import { createPool } from 'mysql2/promise';
import { drizzle } from 'drizzle-orm/mysql2';
/**
 * Создаёт и предоставляет инстанс Drizzle ORM.
 */
const pool = createPool({
  host: process.env['MYSQL_HOST_AND_NAME_DATABASE'],
  port: Number(process.env['MYSQL_PORT']),
  user: process.env['MYSQL_USER'],
  password: process.env['MYSQL_PASSWORD'],
  database: process.env['MYSQL_HOST_AND_NAME_DATABASE'],
  charset: 'utf8',
});

/** Drizzle‑обёртка над MySQL‑пулом */
const db = drizzle(pool);

/** Глобальный модуль БД. */
@Module({
  imports: [],
  exports: ['DRIZZLE_DB'],
  controllers: [],
  providers: [
    {
      provide: 'DRIZZLE_DB',
      useValue: db,
    },
  ],
})
export class DbModule {}
