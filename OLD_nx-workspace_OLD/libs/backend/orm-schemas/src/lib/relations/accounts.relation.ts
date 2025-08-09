import { relations } from 'drizzle-orm';
import { accountsSchema } from '../schemas/accounts.schema';
import { sessionsSchema } from '../schemas/sessions.schema';

/** Связь: один аккаунт может иметь много сессий */
export const accountsRelations = relations(accountsSchema, (params) => {
  return {
    sessions: params.many(sessionsSchema),
  };
});
