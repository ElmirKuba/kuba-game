import { relations } from 'drizzle-orm';
import { sessionsSchema } from '../orm-schemas/sessions.schema';
import { accountSchema } from '../orm-schemas/account.schema';

/** Связь: одна сессия может иметь один аккаунт */
export const sessionsRelations = relations(sessionsSchema, (params) => {
  return {
    account: params.one(accountSchema, {
      fields: [sessionsSchema.accountId],
      references: [accountSchema.id],
    }),
  };
});
