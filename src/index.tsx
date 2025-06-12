import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { useLogger } from "@react-navigation/devtools";

import { Text } from "@react-navigation/elements";
import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import * as React from "react";
import { useWindowDimensions } from "react-native";
import { SystemBars } from "react-native-edge-to-edge";

import { type RootStackParamList } from "./navigation/types";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { linking } from "./navigation/linking";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SessionsFilterScreen from "./screens/SessionsFilterScreen";
import SessionDetailScreen from "./screens/SessionDetailScreen";
import { lightTheme } from "./res/colors";
import { DrawerNavigator } from "./navigation/DrawerNavigator";
import SpeakerDetailScreen from "./screens/SpeakerDetailScreen";

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
  const [theme, setTheme] = React.useState(lightTheme);

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
        theme={lightTheme}
        linking={linking}
        fallback={<Text>Loading…</Text>}
      >
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={DrawerNavigator}
            options={{ headerShown: false }}
          />
          {/* <Stack.Screen name="Tutorial" component={TutorialScreen} /> */}
          {/* <Stack.Screen name="SpeakerList" component={SpeakerListScreen} /> */}
          <Stack.Screen name="SpeakerDetail" component={SpeakerDetailScreen} />
          {/* <Stack.Screen name="Login" component={LoginScreen} /> */}
          {/* <Stack.Screen name="About" component={AboutScreen} /> */}
          <Stack.Screen name="SessionDetail" component={SessionDetailScreen} />
          {/* <Stack.Screen name="Account" component={AccountScreen} /> */}
          {/* <Stack.Screen name="Map" component={MapScreen} /> */}
          <Stack.Group
            screenOptions={{
              presentation: "formSheet",
            }}
          >
            <Stack.Screen
              name="SessionsFilter"
              component={SessionsFilterScreen}
            />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </Providers>
  );
}
