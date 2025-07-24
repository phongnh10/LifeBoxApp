import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import NotesTab from '../Notes/NotesTab';
import ProfileTab from '../Profile/ProfileTab';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="NotesTab"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#6366F1',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E5E7EB',
          height: 60,
          paddingBottom: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = 'help-circle-outline';

          if (route.name === 'NotesTab') {
            iconName = focused ? 'notebook' : 'notebook-outline';
          } else if (route.name === 'ProfileTab') {
            iconName = focused ? 'account-circle' : 'account-circle-outline';
          }

          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          );
        },
      })}
    >
      <Tab.Screen
        name="NotesTab"
        component={NotesTab}
        options={{ title: 'Ghi chú' }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileTab}
        options={{ title: 'Hồ sơ' }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
