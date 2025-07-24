import { navigationRef } from './AppNavigate';

export function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

export const goToLogin = () => navigate('LoginScreen');
export const goToRegister = () => navigate('RegisterScreen');
export const goToMainTab = () => navigate('BottomTabNavigator');
