import {
  type BottomTabScreenProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";

import { IS_LARGE_SCREEN } from "../constants";
import { HeaderBackButton } from "@react-navigation/elements";
import { Ionicons } from "@expo/vector-icons";
import {
  useNavigation,
  type CompositeScreenProps,
} from "@react-navigation/core";
import type { RootDrawerParamList, RootStackParamList } from "./types";
import type { DrawerScreenProps } from "@react-navigation/drawer";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
// screens
import ScheduleScreen from "../screens/ScheduleScreen";
import { Platform, View } from "react-native";
import MapScreen from "../screens/MapScreen";
import SpeakerListScreen from "../screens/SpeakerListScreen";
import AboutScreen from "../screens/AboutScreen";

export type BottomTabParams = {
  Schedule: undefined;
  Speakers: undefined;
  Map: undefined;
  About: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParams>();

export function BottomTabs() {
  const navigation =
    useNavigation<
      CompositeScreenProps<
        DrawerScreenProps<RootDrawerParamList>,
        NativeStackScreenProps<RootStackParamList>
      >["navigation"]
    >();

  return (
    <>
      <Tab.Navigator
        screenOptions={({}: BottomTabScreenProps<BottomTabParams>) => ({
          headerLeft: (props) => (
            <HeaderBackButton
              {...props}
              backImage={() => (
                <Ionicons
                  name="menu"
                  size={24}
                  color={props.tintColor}
                  style={{ padding: Platform.OS === "ios" ? 8 : 0 }}
                />
              )}
              onPress={navigation.openDrawer}
            />
          ),
          tabBarPosition: IS_LARGE_SCREEN ? "left" : "bottom",
          animation: "shift",
        })}
      >
        <Tab.Screen
          name="Schedule"
          component={ScheduleScreen}
          options={{ tabBarIcon: getTabBarIcon("calendar-outline") }}
        />
        <Tab.Screen
          name="Speakers"
          component={SpeakerListScreen}
          options={{ tabBarIcon: getTabBarIcon("people-outline") }}
        />
        <Tab.Screen
          name="Map"
          component={MapScreen}
          options={{ tabBarIcon: getTabBarIcon("map-outline") }}
        />
        <Tab.Screen
          name="About"
          component={AboutScreen}
          options={{
            tabBarIcon: getTabBarIcon("information-circle-outline"),
            headerBackgroundContainerStyle: { backgroundColor: "transparent" },
            headerTransparent: true,
            headerTitle: "",
          }}
        />
      </Tab.Navigator>
    </>
  );
}

const getTabBarIcon =
  (name: React.ComponentProps<typeof Ionicons>["name"]) =>
  ({ color, size }: { color: string; size: number }) => {
    return <Ionicons name={name} color={color} size={size} />;
  };
