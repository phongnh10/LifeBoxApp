import { SCHEMA_KEYS } from '../../keys';

export const UserSchema = {
  name: SCHEMA_KEYS.USER,
  primaryKey: 'id',
  properties: {
    id: 'string',
    user: 'string',
    password: 'string?',
    biometricEnabled: 'bool',
    language: 'string?',
    avatar: 'string?',
    createdAt: 'date?',
    updatedAt: 'date?',
  },
};
