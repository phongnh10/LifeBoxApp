import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../utils/colors';
import { FONT_SIZES, FONT_WEIGHTS } from '../../utils/typography';
import { SPACING } from '../../utils/spacing';

const CustomButton = ({
  title = 'Button',
  onPress,
  style,
  textStyle,
  fullWidth = false,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, fullWidth && { alignSelf: 'stretch' }, style]}
      activeOpacity={0.7}
      disabled={disabled}
    >
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.buttonPrimary,
    paddingVertical: SPACING.l,
    paddingHorizontal: SPACING.l,
    borderRadius: SPACING.xs,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: COLORS.buttonPrimaryText,
    fontSize: FONT_SIZES.bodyRegular,
    fontWeight: FONT_WEIGHTS.medium,
  },
});

export default CustomButton;
