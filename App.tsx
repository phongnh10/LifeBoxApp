/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { SafeAreaView, StyleSheet } from 'react-native';
import CustomStatusBar from './src/components/Statusbar/CustomStatusBar';
import { COLORS } from './src/utils/colors';
import AppNavigator from './src/navigator/AppNavigate';
import Toast from 'react-native-toast-message';
import './i18n';
import { Provider } from 'react-redux';
import store from './src/store/store';
import { useEffect } from 'react';
import { initAESKey } from './src/utils/crypto';

function App() {
  useEffect(() => {
    initAESKey();
  }, []);

  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <CustomStatusBar backgroundColor={COLORS.backgroundSecondary} />
        <AppNavigator />
        <Toast />
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
