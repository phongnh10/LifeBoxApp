import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterScreen from '../screens/Auth/RegisterScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import BottomTabNavigator from '../screens/Home/Tab/BottomTabNavigator';
import { navigationRef } from './AppNavigate';

const Stack = createNativeStackNavigator();

const AppNavigator = () => (
  <NavigationContainer ref={navigationRef}>
    <Stack.Navigator
      initialRouteName="LoginScreen"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
