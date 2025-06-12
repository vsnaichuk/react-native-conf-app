import {
  type BottomTabScreenProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";

import { IS_LARGE_SCREEN } from "../constants";
import { ScheduleScreen } from "../screens/ScheduleScreen";
import { HeaderBackButton } from "@react-navigation/elements";
import { Ionicons } from "@expo/vector-icons";
import {
  useNavigation,
  type CompositeScreenProps,
} from "@react-navigation/core";
import type { RootDrawerParamList, RootStackParamList } from "./types";
import type { DrawerScreenProps } from "@react-navigation/drawer";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

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
                <Ionicons name="menu" size={23} color={props.tintColor} />
              )}
              onPress={navigation.openDrawer}
            />
          ),
          tabBarPosition: IS_LARGE_SCREEN ? "left" : "bottom",
          animation: "shift",
        })}
      >
        <Tab.Screen name="Schedule" component={ScheduleScreen} />
      </Tab.Navigator>
    </>
  );
}
