import { SCHEMA_KEYS } from '../../keys';

export const UserSchema = {
  name: SCHEMA_KEYS.USER,
  primaryKey: 'id',
  properties: {
    id: 'string', // UUID hoặc định danh duy nhất
    user: 'string', // Tên người dùng
    password: 'string?', // Có thể là mã PIN
    biometricEnabled: 'bool', // Có bật vân tay/Face ID không
    language: 'string?', // "vi", "en", v.v.
    avatar: 'string?', // 👉 Đường dẫn cục bộ (local URI) tới ảnh đại diện
    createdAt: 'date?', // Ngày tạo tài khoản
    updatedAt: 'date?', // Ngày cập nhật gần nhất
  },
};
