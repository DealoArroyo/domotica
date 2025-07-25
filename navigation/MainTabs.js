import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeStack from './HomeStack';
import SettingsScreen from '../screens/SettingsScreen';
import DiscoverStack from '../screens/discover/DiscoverStack';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Inicio') {
            iconName = 'home';
          } else if (route.name === 'Configuración') {
            iconName = 'settings';
          } else if (route.name === 'Descubrir') {
            iconName = 'star'
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#6200ee',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Inicio" component={HomeStack} />
      <Tab.Screen name="Configuración" component={SettingsScreen} />
      <Tab.Screen name="Descubrir" component={DiscoverStack} />
    </Tab.Navigator>
  );
}
