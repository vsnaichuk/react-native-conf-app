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
  useTheme,
} from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import * as React from "react";
import {
  useWindowDimensions,
  View,
  StyleSheet,
  Switch,
  TouchableOpacity,
} from "react-native";
import { SystemBars } from "react-native-edge-to-edge";

import {
  type RootDrawerParamList,
  type RootStackParamList,
} from "./navigation/types";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { linking } from "./navigation/linking";
import { BottomTabs } from "./navigation/BottomTabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SessionsFilterScreen from "./screens/SessionsFilterScreen";
import SessionDetailScreen from "./screens/SessionDetailScreen";
import { lightTheme, CustomTheme } from "./res/colors";
import { ThemedView } from "./components/themed/ThemedView";
import { ThemedText } from "./components/themed/ThemedText";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Drawer = createDrawerNavigator<RootDrawerParamList>();

const DrawerSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  const { colors } = useTheme() as CustomTheme;

  return (
    <View style={styles.section}>
      <ThemedText
        preset="xl"
        weight="semiBold"
        style={[styles.sectionTitle, { color: colors.text }]}
      >
        {title}
      </ThemedText>
      {children}
    </View>
  );
};

const DrawerMenuItem = ({
  icon,
  label,
  onPress,
  showChevron = true,
}: {
  icon: string;
  label: string;
  onPress: () => void;
  showChevron?: boolean;
}) => {
  const { colors } = useTheme() as CustomTheme;

  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuItemLeft}>
        <Ionicons
          name={icon as any}
          size={24}
          color={colors.primary}
          style={styles.menuIcon}
        />
        <ThemedText style={[styles.menuLabel, { color: colors.text }]}>
          {label}
        </ThemedText>
      </View>
      {showChevron && (
        <Ionicons
          name="chevron-forward"
          size={16}
          color={colors.textSecondary}
        />
      )}
    </TouchableOpacity>
  );
};

const DrawerSwitchItem = ({
  icon,
  label,
  value,
  onValueChange,
}: {
  icon: string;
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}) => {
  const { colors } = useTheme() as CustomTheme;

  return (
    <View style={styles.menuItem}>
      <View style={styles.menuItemLeft}>
        <Ionicons
          name={icon as any}
          size={24}
          color={colors.primary}
          style={styles.menuIcon}
        />
        <ThemedText style={[styles.menuLabel, { color: colors.text }]}>
          {label}
        </ThemedText>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: colors.lightGray, true: colors.primary }}
        thumbColor={value ? colors.white : colors.textSecondary}
      />
    </View>
  );
};

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const { navigation } = props;
  const insets = useSafeAreaInsets();
  const [isDarkMode, setIsDarkMode] = React.useState(false); // TODO: use global state here

  return (
    <ThemedView style={[styles.container, { paddingTop: insets.top }]}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.scrollContainer}
      >
        <DrawerSection title="Conference">
          <DrawerMenuItem
            icon="calendar-outline"
            label="Schedule"
            onPress={() =>
              navigation.navigate("BottomTabs", { screen: "Schedule" })
            }
          />
          <DrawerMenuItem
            icon="people-outline"
            label="Speakers"
            onPress={() => {}}
          />
          <DrawerMenuItem icon="map-outline" label="Map" onPress={() => {}} />
          <DrawerMenuItem
            icon="information-circle-outline"
            label="About"
            onPress={() => {}}
          />
        </DrawerSection>

        <DrawerSection title="Account">
          <DrawerMenuItem
            icon="person-outline"
            label="Account"
            onPress={() => {}}
          />
          <DrawerMenuItem
            icon="help-circle-outline"
            label="Support"
            onPress={() => {}}
          />
          <DrawerMenuItem
            icon="log-out-outline"
            label="Logout"
            onPress={() => {}}
          />
          <DrawerSwitchItem
            icon="moon-outline"
            label="Dark Mode"
            value={isDarkMode}
            onValueChange={setIsDarkMode}
          />
        </DrawerSection>

        <DrawerSection title="Tutorial">
          <DrawerMenuItem
            icon="school-outline"
            label="Show Tutorial"
            onPress={() => {}}
          />
        </DrawerSection>
      </DrawerContentScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingTop: 0,
  },
  section: {
    marginBottom: 40,
  },
  sectionTitle: {
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    minHeight: 56,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  menuIcon: {
    marginRight: 16,
    width: 24,
  },
  menuLabel: {},
});

export const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: 300,
        },
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
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Drawer" component={DrawerNavigator} />
          {/* <Stack.Screen name="Tutorial" component={TutorialScreen} /> */}
          {/* <Stack.Screen name="SpeakerList" component={SpeakerListScreen} /> */}
          {/* <Stack.Screen name="SpeakerDetail" component={SpeakerDetailScreen} /> */}
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
