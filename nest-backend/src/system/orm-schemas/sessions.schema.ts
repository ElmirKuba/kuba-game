import { ISessionFull } from 'src/interfaces/full/session/session-full.interface';
import { defineTableWithSchema } from '../utils/define-table.helper';
import { varchar } from 'drizzle-orm/mysql-core';
import { accountsSchema } from './accounts.schema';
import { text } from 'drizzle-orm/mysql-core';

/** Схема таблицы сессий аккаунта */
export const sessionsSchema = defineTableWithSchema<ISessionFull>('sessions', {
  id: varchar('id', { length: 50 }).primaryKey().notNull(),
  accountId: varchar('account_id', { length: 50 })
    .notNull()
    .references(() => {
      return accountsSchema.id;
    }),
  refreshToken: text('refresh_token', {}).notNull(),
  ua: text('ua'),
  ip: varchar('ip', { length: 15 }),
  browserData: text('browser_data'),
  cpuArchitecture: text('cpu_architecture'),
  deviceData: text('device_data'),
  osData: text('os_data'),
});
