import { relations } from 'drizzle-orm';
import { accountSchema } from '../orm-schemas/account.schema';
import { sessionsSchema } from '../orm-schemas/sessions.schema';

/** Связь: один аккаунт может иметь много сессий */
export const accountsRelations = relations(accountSchema, (params) => {
  return {
    sessions: params.many(sessionsSchema),
  };
});
