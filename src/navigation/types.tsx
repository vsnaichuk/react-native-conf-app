import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootDrawerParamList = {
  BottomTabs: undefined;
};

export type RootStackParamList = {
  Drawer: undefined;
  BottomTabs: undefined;
  Schedule: undefined;
  NotFound: undefined;
};

// Make the default RootParamList the same as the RootStackParamList
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

// Type helpers for the screen props

export type RouteProp<T extends keyof RootStackParamList> = Pick<
  NativeStackScreenProps<RootStackParamList, T>,
  "route"
>;

export type NavigationProp<T extends keyof RootStackParamList> = Pick<
  NativeStackScreenProps<RootStackParamList, T>,
  "navigation"
>;
