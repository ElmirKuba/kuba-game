import { relations } from 'drizzle-orm';
import { sessionsSchema } from '../orm-schemas/sessions.schema';
import { accountsSchema } from '../orm-schemas/accounts.schema';

/** Связь: одна сессия может иметь один аккаунт */
export const sessionsRelations = relations(sessionsSchema, (params) => {
  return {
    account: params.one(accountsSchema, {
      fields: [sessionsSchema.accountId],
      references: [accountsSchema.id],
    }),
  };
});
