import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import LightsScreen from '../screens/LightsScreen';
import SensorsScreen from '../screens/SensorsScreen';
import CameraScreen from '../screens/CameraScreen';
import { StatusBar } from 'expo-status-bar';

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <>
    <StatusBar style='light' />
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="Lights" component={LightsScreen} />
      <Stack.Screen name="Sensors" component={SensorsScreen} />
      <Stack.Screen name="Camera" component={CameraScreen} />
    </Stack.Navigator>
    </>
  );
}
