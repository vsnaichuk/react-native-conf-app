import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { Ionicons } from "@expo/vector-icons";
import { useLogger } from "@react-navigation/devtools";
import {
  createDrawerNavigator,
  type DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import { Text } from "@react-navigation/elements";
import {
  DefaultTheme,
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import * as React from "react";
import { useWindowDimensions, View } from "react-native";
import { SystemBars } from "react-native-edge-to-edge";

import {
  type RootDrawerParamList,
  type RootStackParamList,
} from "./navigation/types";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { linking } from "./navigation/linking";
import { BottomTabs } from "./navigation/BottomTabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// drawer

const Drawer = createDrawerNavigator<RootDrawerParamList>();
const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const { navigation } = props;
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        label="Schedule"
        icon={({ color, size }) => (
          <Ionicons name="calendar" color={color} size={size} />
        )}
        onPress={() => {
          navigation.navigate("BottomTabs", {
            screen: "Schedule",
          });
        }}
      />
      <DrawerItem
        label="Chat"
        icon={({ color, size }) => (
          <Ionicons name="person" color={color} size={size} />
        )}
        onPress={() => {
          // Do nothing for now
        }}
      />
    </DrawerContentScrollView>
  );
};
export const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen name="BottomTabs" component={BottomTabs} />
    </Drawer.Navigator>
  );
};

// root stack

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ErrorBoundary
      onError={() => {
        // do something on error here
      }}
    >
      <ActionSheetProvider>
        <>{children}</>
      </ActionSheetProvider>
    </ErrorBoundary>
  );
};
const Stack = createNativeStackNavigator<RootStackParamList>();
export function App() {
  const [theme, setTheme] = React.useState(DefaultTheme);

  const dimensions = useWindowDimensions();

  const navigationRef = useNavigationContainerRef();

  useLogger(navigationRef);
  // useReduxDevToolsExtension(navigationRef);

  return (
    <Providers>
      <SystemBars style="auto" />
      <NavigationContainer
        ref={navigationRef}
        onReady={() => {
          SplashScreen.hideAsync();
        }}
        theme={theme}
        linking={linking}
        fallback={<Text>Loading…</Text>}
      >
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Drawer" component={DrawerNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </Providers>
  );
}
