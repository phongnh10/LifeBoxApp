import { View, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import CustomInput from '../../components/Inputs/CustomInput';
import CustomInputPass from '../../components/Inputs/CustomInputPass';
import CustomButton from '../../components/Buttons/CusstomBotton';
import { BASE_COLORS, COLORS, SPACING } from '../../utils';
import i18n from '../../../i18n';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { registerRequest, userSelectors } from '../../redux/user/userSlice';
import { showToast } from '../../components/toast/toast';
import FullScreenLoader from '../../components/Loading/FullScreenLoader';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const loading = useSelector(userSelectors.isRegisterLoading);
  const user = useSelector(userSelectors.user);

  const [username, setUsername] = useState(user?.username);
  const [password, setPassword] = useState(user?.password);
  const [firstname, setFirstname] = useState('Phong');
  const [lastname, setLastname] = useState('Nguyen');
  const [confirmPassword, setConfirmPassword] = useState();

  const handleRegister = () => {
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
    dispatch(
      registerRequest({
        username,
        password,
        firstname,
        lastname,
      }),
    );
  };

  return (
    <View style={styles.container}>
      <CustomInput
        title={i18n.t('auth.firstname')}
        value={firstname}
        onChangeText={setFirstname}
        placeholder={i18n.t('auth.firstname')}
        fullWidth
      />
      <CustomInput
        title={i18n.t('auth.lastname')}
        value={lastname}
        onChangeText={setLastname}
        placeholder={i18n.t('auth.lastname')}
        fullWidth
      />
      <CustomInput
        title={i18n.t('auth.username')}
        value={username}
        onChangeText={setUsername}
        placeholder={i18n.t('auth.username')}
        fullWidth
      />
      <CustomInputPass
        title={i18n.t('auth.password')}
        value={password}
        onChangeText={setPassword}
        placeholder={i18n.t('auth.password')}
        fullWidth
      />
      <CustomInputPass
        title={i18n.t('auth.confirmPassword')}
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
        style={{ backgroundColor: BASE_COLORS.success }}
      />
      <CustomButton
        title={i18n.t('auth.login')}
        onPress={() => navigation.navigate('LoginScreen')}
        fullWidth
      />
      <FullScreenLoader visible={loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundWhite,
    gap: SPACING.l,
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
