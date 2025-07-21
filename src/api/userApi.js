import { decryptText, encryptText } from '../utils/crypto';
import { openDB } from '../utils/databaseSetup';
import { getSystemLanguage } from '../utils/language';

// Chuẩn hoá dữ liệu người dùng trước khi ghi DB
const normalizeUserData = async data => {
  const systemLanguage = await getSystemLanguage();

  return {
    username: data.username,
    password: await encryptText(data.password),
    firstname: data.firstname ?? null,
    lastname: data.lastname ?? null,
    biometricEnabled: data.biometricEnabled ? 1 : 0,
    language: data.language ?? systemLanguage,
    avatar: data.avatar ?? null,
    createdAt: data.createdAt ?? Date.now(),
    updatedAt: data.updatedAt ?? Date.now(),
  };
};

// Tạo người dùng mới
export const createUser = async userData => {
  const db = await openDB();
  const user = await normalizeUserData(userData);

  try {
    const [result] = await db.executeSql(
      `INSERT INTO users (username, password, firstname, lastname, biometricEnabled, language, avatar, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
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
    return result.insertId;
  } catch (error) {
    throw new Error('Failed to create user: ' + error.message);
  }
};

// Đăng nhập người dùng
export const loginUser = async ({ username, password }) => {
  const db = await openDB();

  try {
    const [results] = await db.executeSql(
      'SELECT * FROM users WHERE username = ?',
      [username],
    );

    if (results.rows.length === 0) return null;

    const user = results.rows.item(0);
    const decryptedPassword = await decryptText(user.password);

    if (decryptedPassword === password) {
      delete user.password;
      return user;
    }

    return null;
  } catch (error) {
    throw new Error('Login failed: ' + error.message);
  }
};

// get user by username
export const getUserByUsername = async username => {
  const db = await openDB();
  const [results] = await db.executeSql(
    `SELECT * FROM users WHERE username = ? LIMIT 1`,
    [username],
  );
  return results.rows.length > 0 ? results.rows.item(0) : null;
};
