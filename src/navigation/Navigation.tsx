import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import RootStack from "./RootStack";
import { navigationRef } from "../utils/navigationService";

function Navigation(): JSX.Element {
  return (
    <NavigationContainer ref={navigationRef}>
      <RootStack />
    </NavigationContainer>
  );
}

export default Navigation;
