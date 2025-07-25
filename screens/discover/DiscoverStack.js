import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EntranceScreen from './EntranceScreen';
import StartScreen from './StartScreen';
import LightingScreen from './LightingScreen';
import SecurityScreen from './SecurityScreen';
import DiscoverScreen from './DiscoverScreen';

const Stack = createNativeStackNavigator();

export default function DiscoverStack() {
  return (
    <>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Discover" component={DiscoverScreen} />
      <Stack.Screen name="Start" component={StartScreen} />
      <Stack.Screen name="Lighting" component={LightingScreen} />
      <Stack.Screen name="Security" component={SecurityScreen} />
      <Stack.Screen name="Entrance" component={EntranceScreen} />
    </Stack.Navigator>
    </>
  );
}
