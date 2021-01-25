import React from "react";
import FlashMessage from "react-native-flash-message";

import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { AppLoading } from "expo";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./src/redux/index";

import AppStack from "./src/routes/AppStack";

export default function App() {
  const [fontsLoaded] = useFonts({
    "LilyScriptOne-Regular": require("./src/assets/fonts/LilyScriptOne-Regular.ttf"),
    "Mada-Light": require("./src/assets/fonts/Mada-Light.ttf"),
    "Mada-Medium": require("./src/assets/fonts/Mada-Medium.ttf"),
    "Mada-Regular": require("./src/assets/fonts/Mada-Light.ttf"),
    "Mada-Bold": require("./src/assets/fonts/Mada-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <StatusBar style="dark" />
        <AppStack />
        <FlashMessage position="bottom" />
      </PersistGate>
    </Provider>
  );
}
