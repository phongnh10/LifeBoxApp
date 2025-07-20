import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';
import { COLORS, FONT_SIZES, SPACING } from '../../utils';

const CustomInput = ({
  value,
  onChangeText,
  placeholder = '',
  keyboardType = 'default',
  style,
  fullWidth = false,
  ...rest
}) => (
  <View style={[styles.wrapper, fullWidth && { alignSelf: 'stretch' }, style]}>
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={COLORS.textSecondary}
      keyboardType={keyboardType}
      style={styles.input}
      {...rest}
    />
  </View>
);

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
});

export default CustomInput;
