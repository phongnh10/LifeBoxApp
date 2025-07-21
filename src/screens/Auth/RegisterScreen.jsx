import { View, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import CustomInput from '../../components/Inputs/CustomInput';
import CustomInputPass from '../../components/Inputs/CustomInputPass';
import CustomButton from '../../components/Buttons/CusstomBotton';
import Toast from 'react-native-toast-message';
import { COLORS, SPACING } from '../../utils';
import i18n from '../../../i18n';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../../store/users';
import { getSystemLanguage } from '../../utils/language';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const loading = useSelector(state => state.user.loading);

  const [username, setUsername] = useState('phong@gmail.com');
  const [password, setPassword] = useState('Phong123');
  const [firstname, setFirstname] = useState('Nguyen');
  const [lastname, setLastname] = useState('phong');
  const [confirmPassword, setConfirmPassword] = useState('Phong123');

  const showToast = (type, title, message) => {
    Toast.show({
      type,
      text1: title,
      text2: message,
    });
  };

  const handleRegister = async () => {
    try {
      const errorMessage = validateRegisterFields({
        firstname,
        lastname,
        username,
        password,
        confirmPassword,
      });

      if (errorMessage) {
        showToast('error', i18n.t('messages.error'), errorMessage);
        return;
      }

      const language = await getSystemLanguage();

      const result = await dispatch(
        createUser({
          username,
          password,
          firstname,
          lastname,
          language,
        }),
      );

      if (createUser.fulfilled.match(result)) {
        navigation.navigate('LoginScreen');
        showToast('success', i18n.t('messages.registrationSuccess'));
      } else {
        showToast(
          'error',
          i18n.t('messages.error'),
          result.payload || i18n.t('messages.somethingWentWrong'),
        );
      }
    } catch (error) {
      console.error(error.message);
      showToast('error', i18n.t('messages.error'), error.message);
    }
  };

  return (
    <View style={styles.container}>
      <CustomInput
        value={firstname}
        onChangeText={setFirstname}
        placeholder={i18n.t('auth.firstname')}
        fullWidth
      />
      <CustomInput
        value={lastname}
        onChangeText={setLastname}
        placeholder={i18n.t('auth.lastname')}
        fullWidth
      />
      <CustomInput
        value={username}
        onChangeText={setUsername}
        placeholder={i18n.t('auth.username')}
        fullWidth
      />
      <CustomInputPass
        value={password}
        onChangeText={setPassword}
        placeholder={i18n.t('auth.placeholder')}
        fullWidth
      />
      <CustomInputPass
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder={i18n.t('auth.password')}
        fullWidth
      />
      <CustomButton
        title={i18n.t('auth.register')}
        onPress={handleRegister}
        fullWidth
        disabled={loading}
      />
      <CustomButton
        title={i18n.t('auth.login')}
        onPress={() => navigation.navigate('LoginScreen')}
        fullWidth
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

export default RegisterScreen;

const validateRegisterFields = ({
  firstname,
  lastname,
  username,
  password,
  confirmPassword,
}) => {
  if (!firstname) return i18n.t('messages.emptyFirstname');
  if (!lastname) return i18n.t('messages.emptyLastname');
  if (!username) return i18n.t('messages.emptyUsername');
  if (!password) return i18n.t('messages.emptyPassword');
  if (password.length < 8)
    return i18n.t('validation.minCharacters', { min: 8 });

  if (!confirmPassword) return i18n.t('messages.emptyConfirmPassword');
  if (password !== confirmPassword) return i18n.t('messages.passwordMismatch');
  return null;
};
