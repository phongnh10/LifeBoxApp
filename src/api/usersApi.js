import { comparePassword, hashPassword } from '../utils/crypto';
import { getDB } from '../utils/databaseSetup';
import { getSystemLanguage } from '../utils/language';
import { v4 as uuidv4 } from 'uuid';

// kiem
const normalizeUserData = async data => {
  const now = new Date().toISOString();
  const [hashedPassword, systemLanguage] = await Promise.all([
    hashPassword(data.password),
    getSystemLanguage(),
  ]);

  return {
    id: uuidv4(),
    username: data.username.trim().toLowerCase(),
    password: hashedPassword,
    firstname: data.firstname?.trim() ?? null,
    lastname: data.lastname?.trim() ?? null,
    biometricEnabled: 0,
    language: systemLanguage,
    avatar: null,
    createdAt: now,
    updatedAt: now,
  };
};

// Tạo người dùng mới
export const createUser = async userData => {
  try {
    const db = getDB();
    const user = await normalizeUserData(userData);

    await db.executeSql(
      `INSERT INTO users (
        id, username, password, firstname, lastname,
        biometricEnabled, language, avatar, createdAt, updatedAt
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        user.id,
        user.username,
        user.password,
        user.firstname,
        user.lastname,
        user.biometricEnabled,
        user.language,
        user.avatar,
        user.createdAt,
        user.updatedAt,
      ],
    );

    console.log(`[createUser] User created: ${user.username}`);
    return { ...user, password: null };
  } catch (error) {
    console.warn('[createUser] Failed to create user:', error.message);
    throw new Error('Failed to create user: ' + error.message);
  }
};

// Đăng nhập người dùng
export const loginUser = async ({ username, password }) => {
  try {
    const db = getDB();
    const normalizedUsername = username.trim().toLowerCase();

    const [results] = await db.executeSql(
      'SELECT * FROM users WHERE username = ? LIMIT 1',
      [normalizedUsername],
    );

    if (results.rows.length === 0) {
      console.log(`[loginUser] No user found: ${normalizedUsername}`);
      return null;
    }

    const user = results.rows.item(0);
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      console.log(`[loginUser] Password mismatch: ${normalizedUsername}`);
      return null;
    }

    delete user.password;
    console.log(`[loginUser] Login success: ${user.username}`);
    return user;
  } catch (error) {
    console.log('[loginUser] Failed:', error.message);
    throw new Error('Login failed: ' + error.message);
  }
};

// Lấy user theo username
export const getUserByUsername = async username => {
  try {
    const db = getDB();
    const normalizedUsername = username.trim().toLowerCase();

    const [results] = await db.executeSql(
      'SELECT * FROM users WHERE username = ? LIMIT 1',
      [normalizedUsername],
    );

    if (results.rows.length === 0) return null;

    const user = results.rows.item(0);
    delete user.password;
    return user;
  } catch (error) {
    console.log('[getUserByUsername] Failed:', error.message);
    throw new Error('Failed to get user: ' + error.message);
  }
};

// Xóa user
export const deleteUser = async userId => {
  try {
    const db = getDB();
    await db.executeSql('DELETE FROM users WHERE id = ?', [userId]);
    console.log(`[deleteUser] User deleted: ${userId}`);
  } catch (error) {
    console.warn('[deleteUser] Failed:', error.message);
    throw new Error('Failed to delete user: ' + error.message);
  }
};

// Kiểm tra toàn bộ user trong DB
export const checkAllUsers = async () => {
  try {
    const db = getDB();
    const [results] = await db.executeSql('SELECT * FROM users');

    if (results.rows.length === 0) {
      console.log('[checkAllUsers] No users found in DB.');
    } else {
      console.log('[checkAllUsers] Users in DB:', results.rows.raw());
    }
  } catch (error) {
    console.warn('[checkAllUsers] Error reading DB:', error.message);
  }
};
