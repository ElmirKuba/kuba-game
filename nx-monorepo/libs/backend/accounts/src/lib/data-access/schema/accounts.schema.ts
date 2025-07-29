import { mysqlTable, varchar } from 'drizzle-orm/mysql-core';

/** Схема таблицы accounts */
export const accountsMySQLTable = mysqlTable('accounts', {
  id: varchar('id', { length: 50 }).primaryKey(),
  login: varchar('login', { length: 20 }).notNull(),
  password: varchar('password', { length: 30 }).notNull(),
});
