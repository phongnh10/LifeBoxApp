export const ReminderSchema = {
  name: 'Reminder',
  primaryKey: '_id',
  properties: {
    _id: 'int',
    title: 'string',
    type: 'string', // ví dụ: 'thuốc', 'nước', 'tập thể dục'
    time: 'date',
    repeat: 'string?', // "daily", "weekly", etc.
    isActive: 'bool',
  },
};
