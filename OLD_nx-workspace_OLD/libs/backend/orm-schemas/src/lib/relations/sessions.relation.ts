import { relations } from 'drizzle-orm';
import { sessionsSchema } from '../schemas/sessions.schema';
import { accountsSchema } from '../schemas/accounts.schema';

/** Связь: одна сессия может иметь один аккаунт */
export const sessionsRelations = relations(sessionsSchema, (params) => {
  return {
    account: params.one(accountsSchema, {
      fields: [sessionsSchema.accountId],
      references: [accountsSchema.id],
    }),
  };
});
