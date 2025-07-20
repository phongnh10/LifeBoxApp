/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { RealmProvider } from './src/realm/providers/RealmProvider';
import { SafeAreaView, StyleSheet } from 'react-native';
import CustomStatusBar from './src/components/Statusbar/CustomStatusBar';
import { COLORS } from './src/utils/colors';
import AppNavigator from './src/navigator/AppNavigate';
import Toast from 'react-native-toast-message';
import './i18n';

function App() {
  return (
    <RealmProvider>
      <SafeAreaView style={styles.container}>
        <CustomStatusBar backgroundColor={COLORS.backgroundSecondary} />
        <AppNavigator />
        <Toast />
      </SafeAreaView>
    </RealmProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
