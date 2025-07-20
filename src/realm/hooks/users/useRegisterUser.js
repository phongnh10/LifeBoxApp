import { BSON } from 'realm';
import { useRealm } from '@realm/react'; // Import useRealm từ @realm/react
import Toast from 'react-native-toast-message';
import i18n from '../../../../i18n'; // Điều chỉnh đường dẫn cho phù hợp
import { SCHEMA_KEYS } from '../../../keys'; // Điều chỉnh đường dẫn cho phù hợp

export const useRegisterUser = () => {
  // useRealm() phải được gọi ở cấp cao nhất của Hook này
  // và Hook này phải được gọi trong một component nằm trong RealmProvider
  const realm = useRealm();

  const registerUser = async ({
    // Đổi thành async nếu bạn muốn dùng await bên trong
    user,
    password,
    confirmPassword,
    language,
    avatar,
  }) => {
    try {
      // Kiểm tra đầu vào
      if (!user || !password || !confirmPassword) {
        Toast.show({
          type: 'error',
          text1: i18n.t('messages.error'),
          text2: i18n.t('messages.requiredField'),
        });
        return false;
      }

      if (password.length < 8) {
        Toast.show({
          type: 'error',
          text1: i18n.t('messages.error'),
          text2: i18n.t('messages.passwordTooShort', { min: 8 }),
        });
        return false;
      }

      if (password !== confirmPassword) {
        Toast.show({
          type: 'error',
          text1: i18n.t('messages.error'),
          text2: i18n.t('messages.passwordNoMatch'),
        });
        return false;
      }

      // Kiểm tra user đã tồn tại
      // Lưu ý: realm.objects() và filtered() là các thao tác đồng bộ
      const isExist =
        realm.objects(SCHEMA_KEYS.USER).filtered('user == $0', user).length > 0;

      if (isExist) {
        Toast.show({
          type: 'error',
          text1: i18n.t('messages.error'),
          text2: i18n.t('messages.userExists'),
        });
        return false;
      }

      // Tạo user mới
      // Thao tác ghi (write) là đồng bộ
      realm.write(() => {
        realm.create(SCHEMA_KEYS.USER, {
          id: new BSON.UUID().toString(),
          user,
          password,
          language: language || 'vi', // Sử dụng giá trị từ tham số hoặc mặc định
          biometricEnabled: false,
          avatar: avatar || '', // Sử dụng giá trị từ tham số hoặc mặc định
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      });

      Toast.show({
        type: 'success',
        text1: i18n.t('messages.success'),
        text2: i18n.t('messages.registrationSuccess'),
      });

      return true;
    } catch (error) {
      console.error('Register user error:', error);
      Toast.show({
        type: 'error',
        text1: i18n.t('messages.error'),
        text2: i18n.t('messages.serverError'),
      });
      return false;
    }
  };

  // Trả về hàm registerUser để component có thể gọi
  return registerUser;
};
