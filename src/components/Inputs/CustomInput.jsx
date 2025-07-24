import React from 'react';
import { TextInput, StyleSheet, View, Text } from 'react-native';
import { COLORS, FONT_SIZES, FONT_WEIGHTS, SPACING } from '../../utils';

const CustomInput = ({
  value,
  onChangeText,
  placeholder = '',
  keyboardType = 'default',
  style,
  fullWidth = false,
  title = 'Title',
  ...rest
}) => (
  <View style={[styles.wrapper, fullWidth && { alignSelf: 'stretch' }, style]}>
    <View style={styles.content}>
      <Text style={styles.textTilte}>{title}</Text>
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
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    gap: SPACING.s,
  },
  content: {
    width: '100%',
    flexDirection: 'column',
    gap: SPACING.s,
  },
  textTilte: {
    fontSize: FONT_SIZES.bodyRegular,
    fontWeight: FONT_WEIGHTS.medium,
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
