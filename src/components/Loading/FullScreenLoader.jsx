import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

const FullScreenLoader = ({ visible }) => {
  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <ActivityIndicator animating={true} size="large" color="#6200ee" />
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
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // nền mờ
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999, // đảm bảo hiển thị trên cùng
  },
});

export default FullScreenLoader;
