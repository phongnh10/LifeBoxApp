import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../../components/Buttons/CusstomBotton';
import CustomInput from '../../components/Inputs/CustomInput';
import { COLORS, SPACING } from '../../utils';
import { useDispatch, useSelector } from 'react-redux';
import i18n from '../../../i18n';
import Toast from 'react-native-toast-message';
import { loginUser } from '../../store/users';

const LoginScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const loading = useSelector(state => state.user.loading);

  const [username, setUsername] = useState('phong@gmail.com');
  const [password, setPassword] = useState('Phong123');

  const handleLogin = async () => {
    try {
      const errorMessage = validateRegisterFields({ username, password });

      if (errorMessage) {
        showToast('error', i18n.t('messages.error'), errorMessage);
        return;
      }

      const result = await dispatch(loginUser({ username, password }));

      if (loginUser.fulfilled.match(result)) {
        navigation.navigate('BottomTabNavigator');
        showToast('success', i18n.t('messages.loginSuccess'));
      } else {
        showToast(
          'error',
          i18n.t('messages.error'),
          i18n.t('messages.somethingWentWrong'),
        );
      }
    } catch (error) {
      console.error('error', i18n.t('messages.error'), error.message);
    }
  };

  return (
    <View style={styles.container}>
      <CustomInput
        value={username}
        onChangeText={setUsername}
        fullWidth
        placeholder={i18n.t()}
      />
      <CustomInput
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your password"
        fullWidth
      />
      <CustomButton
        title="Đăng nhập"
        onPress={handleLogin}
        fullWidth
        disabled={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundSecondary,
    gap: SPACING.m,
    padding: SPACING.l,
  },
});

export default LoginScreen;

const validateRegisterFields = ({ username, password }) => {
  if (!username) return i18n.t('messages.emptyUsername');
  if (!password) return i18n.t('messages.emptyPassword');
  if (password.length < 8)
    return i18n.t('validation.minCharacters', { min: 8 });
  return null;
};

const showToast = (type, title, message) => {
  Toast.show({
    type,
    text1: title,
    text2: message,
  });
};
