import { createRealmContext } from '@realm/react';
import { UserSchema } from './schemas/UserSchema';

const realmContext = createRealmContext({
  schema: [UserSchema],
  schemaVersion: 4,
});

export const RealmProvider = realmContext.RealmProvider;
export const useRealm = realmContext.useRealm;
export const useQuery = realmContext.useQuery;
export const useObject = realmContext.useObject;
