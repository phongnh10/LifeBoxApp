import 'react-native-get-random-values';
import AES from 'crypto-js/aes';
import Utf8 from 'crypto-js/enc-utf8';
import EncryptedStorage from 'react-native-encrypted-storage';

const AES_KEY_STORAGE_KEY = 'aes_key';

// Tạo key AES ngẫu nhiên
export const generateAESKey = () => {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
};

// Lưu key vào EncryptedStorage
export const storeAESKey = async key => {
  try {
    await EncryptedStorage.setItem(AES_KEY_STORAGE_KEY, key);
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

// Lấy hoặc tạo mới key nếu chưa có
export const getOrCreateAESKey = async () => {
  let key = await getAESKey();
  if (!key) {
    key = generateAESKey();
    await storeAESKey(key);
    console.log('AES key đã được tạo và lưu');
  } else {
    console.log('AES key đã tồn tại');
  }
  return key;
};

// Gọi khi app khởi động
export const initAESKey = async () => {
  await getOrCreateAESKey();
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
