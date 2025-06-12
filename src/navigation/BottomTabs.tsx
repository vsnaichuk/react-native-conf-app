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
import { Platform } from "react-native";

export type BottomTabParams = {
  Schedule: undefined;
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
          headerRightContainerStyle: { height: 40 },
          headerLeftContainerStyle: { height: 40 },
          tabBarPosition: IS_LARGE_SCREEN ? "left" : "bottom",
          animation: "shift",
        })}
      >
        <Tab.Screen name="Schedule" component={ScheduleScreen} />
      </Tab.Navigator>
    </>
  );
}
