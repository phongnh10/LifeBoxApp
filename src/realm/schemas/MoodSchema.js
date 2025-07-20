export const MoodSchema = {
  name: 'Mood',
  primaryKey: '_id',
  properties: {
    _id: 'int',
    moodLevel: 'int', // 1–5
    note: 'string?',
    date: 'date',
  },
};
