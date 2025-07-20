import { SCHEMA_KEYS } from '../../keys';

export const HabitSchema = {
  name: SCHEMA_KEYS.HABIT,
  primaryKey: '_id',
  properties: {
    _id: 'int',
    title: 'string',
    description: 'string?',
    createdAt: 'date',
    completedDates: 'date[]',
  },
};
