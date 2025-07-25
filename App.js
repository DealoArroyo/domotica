// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { theme } from './constants/theme';
import MainTabs from './navigation/MainTabs';

export default function App() {
  return (
    <PaperProvider theme={{ colors: theme.colors }}>
      <NavigationContainer>
        <MainTabs />
      </NavigationContainer>
    </PaperProvider>
  );
}
