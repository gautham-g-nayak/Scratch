import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { navigationOptions } from "./config";
import EditorScreen from "../screens/EditorScreen";
import { RootStackParamList } from "./types";
import ActionScreen from "../screens/ActionScreen";

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();

function RootStack(): JSX.Element {
  return (
    <Navigator screenOptions={navigationOptions}>
      <Screen
        name="EditorScreen"
        component={EditorScreen}
        options={{ title: "Scratch" }}
      />
      <Screen
        name="ActionScreen"
        component={ActionScreen}
        options={{ title: "Actions" }}
      />
    </Navigator>
  );
}

export default RootStack;
