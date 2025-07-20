import React, { useState } from 'react';
import { TextInput, StyleSheet, View, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, FONT_SIZES, SPACING } from '../../utils';

const CustomInputPass = ({
  value,
  onChangeText,
  placeholder = 'Password',
  style,
  fullWidth = false,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View
      style={[styles.wrapper, fullWidth && { alignSelf: 'stretch' }, style]}
    >
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={COLORS.textSecondary}
        secureTextEntry={!showPassword}
        keyboardType="default"
        style={[styles.input, styles.inputWithRightIcon]}
        {...rest}
      />

      <TouchableOpacity
        style={styles.rightIconWrapper}
        onPress={() => setShowPassword(prev => !prev)}
      >
        <MaterialCommunityIcons
          name={showPassword ? 'eye' : 'eye-off'}
          size={22}
          color={COLORS.buttonPrimary}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
  },
  input: {
    padding: SPACING.l,
    backgroundColor: COLORS.inputBackground,
    borderWidth: 1,
    borderRadius: SPACING.xs,
    borderColor: COLORS.inputBorder,
    color: COLORS.inputText,
    fontSize: FONT_SIZES.bodyRegular,
  },
  inputWithRightIcon: {
    paddingRight: 45,
  },
  rightIconWrapper: {
    position: 'absolute',
    right: SPACING.l,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    zIndex: 10,
  },
});

export default CustomInputPass;
