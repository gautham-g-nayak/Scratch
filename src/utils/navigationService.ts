import { createNavigationContainerRef } from "@react-navigation/native";

const navigationRef = createNavigationContainerRef();

function navigate(name: string, params: Record<string, any>) {
  if(navigationRef.isReady()) {
    navigationRef.navigate(name as never, params as never);
  }
}

export {
  navigationRef,
  navigate,
}