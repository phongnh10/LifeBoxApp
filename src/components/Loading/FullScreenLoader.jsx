import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { COLORS } from '../../utils';
import CustomStatusBar from '../Statusbar/CustomStatusBar';

const FullScreenLoader = ({ visible }) => {
  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <CustomStatusBar color={COLORS.overlay} />
      <ActivityIndicator
        animating={true}
        size="large"
        color={COLORS.buttonPrimary}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.overlay,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
});

export default FullScreenLoader;
