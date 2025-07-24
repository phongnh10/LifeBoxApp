import SQLite from 'react-native-sqlite-storage';

SQLite.DEBUG(true);
SQLite.enablePromise(true);

const database_name = 'LifeBoxAppDB.db';
const database_version = '6.0';
const database_displayname = 'SQLite React Native DB';
const database_size = 200000;

let dbInstance = null;

export const initDB = async () => {
  if (dbInstance) {
    console.log('DB already initialized');
    return dbInstance;
  }

  try {
    dbInstance = await SQLite.openDatabase(
      database_name,
      database_version,
      database_displayname,
      database_size,
    );

    console.log('Database opened successfully');

    await createTables(dbInstance);
    return dbInstance;
  } catch (error) {
    console.warn('Open database error:', error);
    throw error;
  }
};

const createTables = async db => {
  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        firstname TEXT,
        lastname TEXT,
        biometricEnabled INTEGER DEFAULT 0,
        language TEXT,
        avatar TEXT,
        createdAt TEXT,
        updatedAt TEXT
    );
  `);

  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS notes (
      id TEXT PRIMARY KEY,
      user_id TEXT,
      title TEXT,
      content TEXT,
      reminder INTEGER,
      createdAt TEXT,
      updatedAt TEXT,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `);

  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS tags (
      id TEXT PRIMARY KEY,
      name TEXT UNIQUE NOT NULL
    );
  `);

  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS note_tags (
      note_id TEXT,
      tag_id TEXT,
      PRIMARY KEY (note_id, tag_id),
      FOREIGN KEY (note_id) REFERENCES notes(id) ON DELETE CASCADE,
      FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
    );
  `);

  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS checklist_items (
      id TEXT PRIMARY KEY,
      note_id TEXT,
      task TEXT,
      done INTEGER DEFAULT 0,
      FOREIGN KEY (note_id) REFERENCES notes(id) ON DELETE CASCADE
    );
  `);

  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS note_images (
      id TEXT PRIMARY KEY,
      note_id TEXT,
      uri TEXT,
      FOREIGN KEY (note_id) REFERENCES notes(id) ON DELETE CASCADE
    );
  `);

  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS note_audio (
      note_id TEXT PRIMARY KEY,
      uri TEXT,
      FOREIGN KEY (note_id) REFERENCES notes(id) ON DELETE CASCADE
    );
  `);

  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS smart_reminders (
      id TEXT PRIMARY KEY,
      user_id TEXT,
      type TEXT,
      title TEXT,
      message TEXT,
      time TEXT,
      repeat_pattern TEXT,
      enabled INTEGER DEFAULT 1,
      sound TEXT DEFAULT 'default',
      vibration INTEGER DEFAULT 1,
      createdAt TEXT,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `);

  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS mood_logs (
      id TEXT PRIMARY KEY,
      user_id TEXT,
      mood TEXT,
      mood_color TEXT,
      mood_icon TEXT,
      note TEXT,
      createdAt TEXT,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `);

  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS health_checkins (
      id TEXT PRIMARY KEY,
      user_id TEXT,
      physical_score INTEGER,
      mental_score INTEGER,
      note TEXT,
      createdAt TEXT,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `);

  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS goals (
      id TEXT PRIMARY KEY,
      user_id TEXT,
      title TEXT,
      description TEXT,
      category TEXT,
      icon TEXT,
      target_date TEXT,
      completed INTEGER DEFAULT 0,
      is_public INTEGER DEFAULT 0,
      createdAt TEXT,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `);

  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS goal_logs (
      id TEXT PRIMARY KEY,
      goal_id TEXT,
      progress_note TEXT,
      progress_percent INTEGER,
      createdAt TEXT,
      FOREIGN KEY (goal_id) REFERENCES goals(id) ON DELETE CASCADE
    );
  `);

  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS photo_journal (
      id TEXT PRIMARY KEY,
      user_id TEXT,
      photo_uri TEXT,
      caption TEXT,
      mood TEXT,
      location TEXT,
      createdAt TEXT,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `);

  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS countdowns (
      id TEXT PRIMARY KEY,
      user_id TEXT,
      title TEXT,
      target_date TEXT,
      icon TEXT,
      color TEXT,
      createdAt TEXT,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `);

  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS documents (
      id TEXT PRIMARY KEY,
      user_id TEXT,
      file_uri TEXT,
      label TEXT,
      category TEXT,
      pin_protected INTEGER DEFAULT 0,
      expire_date TEXT,
      createdAt TEXT,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `);

  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS meditation_sessions (
      id TEXT PRIMARY KEY,
      user_id TEXT,
      type TEXT,
      title TEXT,
      uri TEXT,
      duration INTEGER,
      category TEXT,
      favorite INTEGER DEFAULT 0,
      played_at TEXT,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `);

  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS secret_letters (
      id TEXT PRIMARY KEY,
      user_id TEXT,
      content TEXT,
      emotion_tag TEXT,
      open_date TEXT,
      is_opened INTEGER DEFAULT 0,
      createdAt TEXT,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `);

  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS love_info (
      id TEXT PRIMARY KEY,
      user_id TEXT,
      partner_name TEXT,
      photo_uri TEXT,
      favorite_song TEXT,
      anniversary_type TEXT,
      date_met TEXT,
      date_love TEXT,
      notes TEXT,
      createdAt TEXT,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `);
};

export const getDB = () => dbInstance;
