import 'react-native-get-random-values';
import AES from 'crypto-js/aes';
import Utf8 from 'crypto-js/enc-utf8';
import EncryptedStorage from 'react-native-encrypted-storage';
import bcrypt from 'bcryptjs';

const AES_KEY_STORAGE_KEY = 'aes_key';
let cachedAESKey = null;

// Tạo AES key mạnh hơn với crypto
export const generateAESKey = () => {
  const randomBytes = crypto.getRandomValues(new Uint8Array(32));
  return Array.from(randomBytes)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
};

// Lưu key vào EncryptedStorage
export const storeAESKey = async key => {
  try {
    await EncryptedStorage.setItem(AES_KEY_STORAGE_KEY, key);
    cachedAESKey = key;
  } catch (error) {
    console.error('Lưu AES key thất bại:', error);
    throw error;
  }
};

// Lấy key từ EncryptedStorage
export const getAESKey = async () => {
  try {
    return await EncryptedStorage.getItem(AES_KEY_STORAGE_KEY);
  } catch (error) {
    console.error('Lỗi lấy AES key:', error);
    return null;
  }
};

// Lấy key từ cache hoặc tạo mới
export const getOrCreateAESKey = async () => {
  if (cachedAESKey) return cachedAESKey;

  let key = await getAESKey();
  if (!key) {
    key = generateAESKey();
    await storeAESKey(key);
    console.log('AES key mới đã được tạo');
  } else {
    console.log('AES key đã tồn tại');
  }

  cachedAESKey = key;
  return key;
};

// Gọi khi app start
export const initAESKey = async () => {
  await getOrCreateAESKey();
};

// Xoá AES key (khi logout/reset)
export const clearAESKey = async () => {
  try {
    await EncryptedStorage.removeItem(AES_KEY_STORAGE_KEY);
    cachedAESKey = null;
    console.log('AES key đã bị xoá');
  } catch (error) {
    console.error('Lỗi xoá AES key:', error);
  }
};

// Mã hoá chuỗi
export const encryptText = async plainText => {
  const key = await getOrCreateAESKey();
  return AES.encrypt(plainText, key).toString();
};

// Giải mã chuỗi
export const decryptText = async cipherText => {
  const key = await getOrCreateAESKey();
  const bytes = AES.decrypt(cipherText, key);
  return bytes.toString(Utf8);
};

// Hash password (offline security)
export const hashPassword = async plainPassword => {
  const key = await getOrCreateAESKey();
  const salt = await bcrypt.genSalt(8);
  const combined = plainPassword + key;
  return await bcrypt.hash(combined, salt);
};

// So sánh password
export const comparePassword = async (plainPassword, hashedPassword) => {
  const key = await getOrCreateAESKey();
  const combined = plainPassword + key;
  return await bcrypt.compare(combined, hashedPassword);
};
