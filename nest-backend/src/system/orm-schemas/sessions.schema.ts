import { defineTableWithSchema } from '../utils/define-table.helper';
import { varchar } from 'drizzle-orm/mysql-core';
import { accountSchema } from './account.schema';
import { text } from 'drizzle-orm/mysql-core';
import { ISessionFull } from '../../interfaces/full/session/session-full.interface';

/** Схема таблицы сессий аккаунта */
export const sessionsSchema = defineTableWithSchema<ISessionFull>('sessions', {
  id: varchar('id', { length: 50 }).primaryKey().notNull(),
  accountId: varchar('account_id', { length: 50 })
    .notNull()
    .references(() => {
      return accountSchema.id;
    }),
  refreshToken: text('refresh_token', {}).notNull(),
  ua: text('ua'),
  ip: varchar('ip', { length: 15 }),
  browserData: text('browser_data'),
  cpuArchitecture: text('cpu_architecture'),
  deviceData: text('device_data'),
  osData: text('os_data'),
});
