import { Ionicons } from "@expo/vector-icons";
import {
  createDrawerNavigator,
  type DrawerContentComponentProps,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { useTheme } from "@react-navigation/native";
import * as React from "react";
import { View, StyleSheet, Switch, TouchableOpacity } from "react-native";

import { type RootDrawerParamList } from "./types";
import { BottomTabs } from "./BottomTabs";
import { CustomTheme } from "../res/colors";
import { ThemedView } from "../components/themed/ThemedView";
import { ThemedText } from "../components/themed/ThemedText";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Drawer = createDrawerNavigator<RootDrawerParamList>();

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
