import { v4 as uuidv4 } from 'uuid';
import { getDB } from '../utils/databaseSetup';

// Chuẩn hóa dữ liệu ghi chú
const normalizeNoteData = note => {
  const now = new Date().toISOString();

  return {
    id: uuidv4(),
    user_id: note.user_id,
    title: note.title || '',
    content: note.content || '',
    reminder: note.reminder ? 1 : 0,
    createdAt: note.createdAt || now,
    updatedAt: now,
  };
};

// Tạo ghi chú mới
export const createNote = async noteData => {
  const db = getDB();
  const note = normalizeNoteData(noteData);

  try {
    await db.executeSql(
      `INSERT INTO notes (id, user_id, title, content, reminder, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        note.id,
        note.user_id,
        note.title,
        note.content,
        note.reminder,
        note.createdAt,
        note.updatedAt,
      ],
    );
    console.log(`[createNote] Note created: ${note.id}`);
    return note;
  } catch (error) {
    throw new Error('Failed to create note: ' + error.message);
  }
};

// Cập nhật ghi chú
export const updateNote = async noteData => {
  const db = getDB();
  const now = new Date().toISOString();

  try {
    const [result] = await db.executeSql(
      `UPDATE notes 
       SET title = ?, content = ?, reminder = ?, updatedAt = ?
       WHERE id = ?`,
      [
        noteData.title,
        noteData.content,
        noteData.reminder ? 1 : 0,
        now,
        noteData.id,
      ],
    );

    if (result.rowsAffected === 0) {
      throw new Error('Note not found');
    }
  } catch (error) {
    throw new Error('Failed to update note: ' + error.message);
  }
};

// Xoá ghi chú
export const deleteNote = async noteId => {
  const db = await openDB();

  try {
    const [result] = await db.executeSql(`DELETE FROM notes WHERE id = ?`, [
      noteId,
    ]);
    if (result.rowsAffected === 0) {
      throw new Error('Note not found');
    }
  } catch (error) {
    throw new Error('Failed to delete note: ' + error.message);
  }
};

// Lấy danh sách ghi chú theo user
export const getNotesByUser = async userId => {
  const db = await openDB();

  try {
    const [results] = await db.executeSql(
      `SELECT * FROM notes WHERE user_id = ? ORDER BY updatedAt DESC`,
      [userId],
    );

    const notes = [];
    const rows = results.rows;

    for (let i = 0; i < rows.length; i++) {
      notes.push(rows.item(i));
    }

    return notes;
  } catch (error) {
    throw new Error('Failed to get notes: ' + error.message);
  }
};
