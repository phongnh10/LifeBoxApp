import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../../components/Buttons/CusstomBotton';
import CustomInput from '../../components/Inputs/CustomInput';
import CustomInputPass from '../../components/Inputs/CustomInputPass';
import { COLORS, SPACING } from '../../utils';

const LoginScreen = () => {
  const navigation = useNavigation();

  const [password, setPassword] = useState('HHH');
  const handleLoginSuccess = () => {
    navigation.navigate('BottomTabNavigator');
  };

  return (
    <View style={styles.container}>
      <CustomInput fullWidth placeholder="Nhập tài khoản" />
      <CustomInput
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your password"
        fullWidth
      />
      <CustomInputPass
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your password"
        fullWidth
      />

      <CustomButton title="Đăng nhập" onPress={handleLoginSuccess} fullWidth />
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
