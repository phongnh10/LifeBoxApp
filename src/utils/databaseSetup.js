import SQLite from 'react-native-sqlite-storage';

SQLite.DEBUG(true);
SQLite.enablePromise(true);

const database_name = 'LifeBoxAppDB.db';
const database_version = '3.0';
const database_displayname = 'SQLite React Native DB';
const database_size = 200000;

let db;

export const openDB = async () => {
  if (db) {
    return db;
  }

  try {
    db = await SQLite.openDatabase(
      database_name,
      database_version,
      database_displayname,
      database_size,
    );

    // Tạo bảng nếu chưa có
    await db.executeSql(
      `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        firstname TEXT,
        lastname TEXT,
        biometricEnabled INTEGER DEFAULT 0,
        language TEXT,
        avatar TEXT,
        createdAt TEXT,
        updatedAt TEXT
    );`,
    );

    return db;
  } catch (error) {
    console.error('Open database error: ', error);
    throw error;
  }
};
