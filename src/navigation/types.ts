import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";

export type RootStackParamList = {
  EditorScreen: undefined;
  ActionScreen: {
    isCat: boolean;
  };
};

export type UseNavigationProps = NativeStackNavigationProp<RootStackParamList>;

export type EditorScreenScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "EditorScreen"
>;

export type ActionScreenScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "ActionScreen"
>;
