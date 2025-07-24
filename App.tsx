import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { PaperProvider } from 'react-native-paper';
// @ts-ignore
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-toast-message';
import CustomStatusBar from './src/components/Statusbar/CustomStatusBar';
import { COLORS } from './src/utils/colors';
import { initAESKey } from './src/utils/crypto';
import './i18n';
import store from './src/redux/store';
import AppNavigator from './src/navigator/AppNavigator';
import { initDB } from './src/utils/databaseSetup';

function App() {
  useEffect(() => {
    initAESKey();

    const setupDB = async () => {
      try {
        await initDB();
        console.log('Database initialized at app start');
      } catch (error) {
        console.error('Failed to initialize DB:', error);
      }
    };
    setupDB();
  }, []);

  return (
    <Provider store={store}>
      <PaperProvider
        settings={{
          icon: props => <MaterialCommunityIcons {...props} />,
        }}
      >
        <SafeAreaView style={styles.container}>
          <CustomStatusBar backgroundColor={COLORS.backgroundPrimary} />
          <AppNavigator />
          <Toast />
        </SafeAreaView>
      </PaperProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundPrimary,
  },
});

export default App;
