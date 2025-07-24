import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import CustomButton from '../../components/Buttons/CusstomBotton';
import CustomInput from '../../components/Inputs/CustomInput';
import { BASE_COLORS, COLORS, SPACING } from '../../utils';
import { loginRequest, userSelectors } from '../../redux/user/userSlice';
import i18n from '../../../i18n';
import FullScreenLoader from '../../components/Loading/FullScreenLoader';
import CustomInputPass from '../../components/Inputs/CustomInputPass';

const LoginScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const loading = useSelector(userSelectors.isLoginLoading);
  const user = useSelector(userSelectors.user);

  const [username, setUsername] = useState(user?.username);
  const [password, setPassword] = useState(user?.password);

  const handleLogin = () => {
    const errorMessage = validateRegisterFields({ username, password });

    if (errorMessage) {
      showToast('error', i18n.t('messages.error'), errorMessage);
      return;
    }
    dispatch(loginRequest({ username, password }));
  };

  return (
    <View style={styles.container}>
      <CustomInput
        title={i18n.t('auth.username')}
        value={username}
        onChangeText={setUsername}
        fullWidth
        placeholder={i18n.t(`auth.username`)}
      />
      <CustomInputPass
        title={i18n.t('auth.password')}
        value={password}
        onChangeText={setPassword}
        placeholder={i18n.t('auth.password')}
        fullWidth
      />
      <CustomButton
        title={i18n.t('auth.login')}
        onPress={handleLogin}
        fullWidth
        disabled={loading}
      />
      <View style={styles.text}>
        <Text>{i18n.t('auth.dontHaveAccount')}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
          <Text style={styles.textRegister}>
            {i18n.t('auth.createAccount')}
          </Text>
        </TouchableOpacity>
      </View>
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
  text: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: SPACING.s,
  },
  textRegister: {
    color: BASE_COLORS.info,
    textDecorationLine: 'underline',
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
