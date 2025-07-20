import Realm from 'realm';
import { NoteSchema } from './schemas/NoteSchema';
import { UserSchema } from './schemas/UserSchema';
import { ReminderSchema } from './schemas/ReminderSchema';
import { HabitSchema } from './schemas/HabitSchema';
import { MoodSchema } from './schemas/MoodSchema';

export const realmConfig = {
  schema: [UserSchema],
  schemaVersion: 2,
};

export const getRealm = async () => {
  return await Realm.open(realmConfig);
};
