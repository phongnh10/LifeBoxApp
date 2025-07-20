export const NoteSchema = {
  name: 'Note',
  primaryKey: '_id',
  properties: {
    _id: 'int',
    title: 'string',
    content: 'string',
    tags: 'string[]', // ví dụ: ["học tập", "thư giãn"]
    images: 'string[]', // local path
    audioPath: 'string?',
    createdAt: 'date',
    updatedAt: 'date',
  },
};
