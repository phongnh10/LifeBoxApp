import { View, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import CustomInput from '../../components/Inputs/CustomInput';
import CustomInputPass from '../../components/Inputs/CustomInputPass';
import { COLORS, SPACING } from '../../utils';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../../components/Buttons/CusstomBotton';
import i18n from '../../../i18n';
import { useRegisterUser } from '../../realm/hooks/users/useRegisterUser'; // Custom Hook của bạn

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState('phong@gmail.com');
  const [password, setPassword] = useState('Phong123');
  const [confirmPassword, setConfirmPassword] = useState('Phong123');

  const registerUserFn = useRegisterUser();

  const handleRegister = async () => {
    const success = await registerUserFn({
      user,
      password,
      confirmPassword,
      language: null,
      avatar: null,
    });
    if (success) {
      navigation.navigate('BottomTabNavigator');
    }
  };

  const handleLogin = () => {
    navigation.navigate('LoginScreen');
  };

  return (
    <View style={styles.container}>
      <CustomInput
        value={user}
        onChangeText={setUser}
        fullWidth
        placeholder={i18n.t(`auth.username`)}
      />
      <CustomInputPass
        value={password}
        onChangeText={setPassword}
        placeholder={i18n.t(`auth.placeholder`)}
        fullWidth
      />
      <CustomInputPass
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder={i18n.t(`auth.password`)}
        fullWidth
      />

      <CustomButton
        title={i18n.t('auth.register')}
        onPress={handleRegister}
        fullWidth
      />
      <CustomButton
        title={i18n.t('auth.login')}
        onPress={handleLogin}
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
