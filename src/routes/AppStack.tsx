import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Champions from "../screens/Champions";
import Champion from "../components/Champion";
import Abilitys from "../components/Abilitys";
import Skins from "../components/Skins";

const { Navigator, Screen } = createStackNavigator();

function AppStack() {
  return (
    <NavigationContainer>
      <Navigator mode="modal" headerMode="none">
        <Screen name="Champions" component={Champions} />
        <Screen name="Champion" component={Champion} />
        <Screen name="Abilitys" component={Abilitys} />
        <Screen name="Skins" component={Skins} />
      </Navigator>
    </NavigationContainer>
  );
}

export default AppStack;
