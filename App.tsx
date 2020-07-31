import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useFonts } from 'expo-font';
import { AppLoading } from 'expo';

import Routes from './src/routes';

export default function App() {
  const [fontsLoaded] = useFonts({
    'LilyScriptOne-Regular': require('./src/assets/fonts/LilyScriptOne-Regular.ttf'),
    'Mada-Light': require('./src/assets/fonts/Mada-Light.ttf'),
    'Mada-Medium': require('./src/assets/fonts/Mada-Medium.ttf'),
    'Mada-Regular': require('./src/assets/fonts/Mada-Light.ttf'),
    'Mada-Bold': require('./src/assets/fonts/Mada-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <>
      <StatusBar style="light"/>
      <Routes/>
    </>
  );
}

