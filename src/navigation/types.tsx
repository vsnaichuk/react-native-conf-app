import {
  DrawerActionHelpers,
  NavigatorScreenParams,
} from "@react-navigation/core";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BottomTabParams } from "./BottomTabs";

export type RootDrawerParamList = {
  BottomTabs: undefined;
};

export type RootStackParamList = {
  Drawer: NavigatorScreenParams<RootDrawerParamList> | undefined;
  BottomTabs: NavigatorScreenParams<BottomTabParams> | undefined;
  Test: { id: string } | undefined;
  Schedule: undefined;
  NotFound: undefined;
  Tutorial: undefined;
  SpeakerList: undefined;
  SpeakerDetail: { id: number } | undefined;
  Login: undefined;
  About: undefined;
  SessionDetail: { id: number };
  Account: undefined;
  Map: undefined;
  SessionsFilter: undefined;
};

// Make the default RootParamList the same as the RootStackParamList
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

// Type helpers for the screen props

export type RouteScreenProp<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>["route"];

export type NavScreenProp<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>["navigation"] &
    DrawerActionHelpers<any>;
