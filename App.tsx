import React from 'react';
import { useFonts, DMSans_400Regular } from '@expo-google-fonts/dm-sans';
import { DMSerifDisplay_400Regular } from '@expo-google-fonts/dm-serif-display';
import AppLoading from 'expo-app-loading';
import { ThemeProvider } from 'styled-components/native';

import theme from './src/theme';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from '@hooks/auth';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { Routes } from './src/routes';

export default function App() {
  const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSerifDisplay_400Regular
  });

  if(!fontsLoaded) {
    return <AppLoading />
  }
  
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider theme={theme}>
        <StatusBar
          backgroundColor="transparent"
          style="light"
          translucent
        />
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}