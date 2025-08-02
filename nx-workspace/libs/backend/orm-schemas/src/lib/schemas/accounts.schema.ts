import { defineTableWithSchema } from '../utils/define-table.helper';
import { IAccountFull } from '@common/interfaces/full';
import { varchar } from 'drizzle-orm/mysql-core';

/** Схема таблицы accounts */
export const accountsSchema = defineTableWithSchema<IAccountFull>('accounts', {
  id: varchar('id', { length: 50 }).primaryKey(),
  login: varchar('login', { length: 20 }).notNull(),
  password: varchar('password', { length: 60 }).notNull(),
});
