import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { useLogger } from "@react-navigation/devtools";
import { useEffect } from "react";

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
import { darkTheme, lightTheme } from "./res/colors";
import { DrawerNavigator } from "./navigation/DrawerNavigator";
// screens
import SessionsFilterScreen from "./screens/SessionsFilterScreen";
import SessionDetailScreen from "./screens/SessionDetailScreen";
import SpeakerDetailScreen from "./screens/SpeakerDetailScreen";
import TutorialScreen from "./screens/TutorialScreen";
import LoginScreen from "./screens/LoginScreen";
import AboutScreen from "./screens/AboutScreen";
import AccountScreen from "./screens/AccountScreen";
import MapScreen from "./screens/MapScreen";
import {
  loadUserData,
  setIsLoggedIn,
  setUsername,
} from "./data/user/user.actions";
import { loadConfData } from "./data/sessions/sessions.actions";
import { connect } from "./data/connect";
import { Schedule } from "./models/Schedule";
import { AppContextProvider } from "./data/AppContext";

interface StateProps {
  darkMode: boolean;
  schedule: Schedule;
}

interface DispatchProps {
  loadConfData: typeof loadConfData;
  loadUserData: typeof loadUserData;
  setIsLoggedIn: typeof setIsLoggedIn;
  setUsername: typeof setUsername;
}

// root stack

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <AppContextProvider>
      <ErrorBoundary
        onError={() => {
          // do something on error here
        }}
      >
        <ActionSheetProvider>
          <>{children}</>
        </ActionSheetProvider>
      </ErrorBoundary>
    </AppContextProvider>
  );
};
const Stack = createNativeStackNavigator<RootStackParamList>();
export function BaseApp({ loadUserData, loadConfData, darkMode }) {
  const dimensions = useWindowDimensions();

  const navigationRef = useNavigationContainerRef();

  useLogger(navigationRef);
  // useReduxDevToolsExtension(navigationRef);

  useEffect(() => {
    loadUserData();
    loadConfData();
  }, []);

  return (
    <>
      <SystemBars style="auto" />
      <NavigationContainer
        ref={navigationRef}
        onReady={() => {
          SplashScreen.hideAsync();
        }}
        theme={darkMode ? darkTheme : lightTheme}
        linking={linking}
        fallback={<Text>Loading…</Text>}
      >
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={DrawerNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Tutorial"
            component={TutorialScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="SpeakerDetail" component={SpeakerDetailScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="About" component={AboutScreen} />
          <Stack.Screen
            name="SessionDetail"
            component={SessionDetailScreen}
            options={{ title: "Session" }}
          />
          <Stack.Screen name="Account" component={AccountScreen} />
          <Stack.Screen name="Map" component={MapScreen} />
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
    </>
  );
}

const BaseAppConnected = connect<{}, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    darkMode: state.user.darkMode,
    schedule: state.data.schedule,
  }),
  mapDispatchToProps: {
    loadConfData,
    loadUserData,
    setIsLoggedIn,
    setUsername,
  },
  component: BaseApp,
});

export function App() {
  return (
    <Providers>
      <BaseAppConnected />
    </Providers>
  );
}
