import React, { useLayoutEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Platform,
  StyleSheet,
} from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";
import Icon from "@expo/vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { format, parseISO } from "date-fns";
import { CustomTheme } from "../res/colors";
import AboutHeaderMenu from "../components/AboutHeaderMenu";
import AboutLocationsMenu from "../components/AboutLocationsMenu";
import { NavScreenProp } from "../navigation/types";
import { ThemedText } from "../components/themed/ThemedText";
import { ThemedView } from "../components/themed/ThemedView";

interface AboutProps {}

const AboutScreen: React.FC<AboutProps> = () => {
  const navigation = useNavigation<NavScreenProp<"About">>();
  const { colors } = useTheme() as CustomTheme;
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [location, setLocation] = useState<
    "madison" | "austin" | "chicago" | "seattle"
  >("madison");
  const [conferenceDate, setConferenceDate] = useState(
    "2047-05-17T00:00:00-05:00"
  );

  const displayDate = (date: string, dateFormat: string) => {
    return format(parseISO(date), dateFormat);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <AboutHeaderMenu />,
    });
  });

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ScrollView>
        <ThemedView
          style={[
            styles.aboutHeader,
            {
              backgroundColor: colors[location] || colors.primary,
            },
          ]}
        />
        <ThemedView style={styles.aboutInfo}>
          <ThemedText preset="lg" weight="bold" style={styles.sectionTitle}>
            About
          </ThemedText>
          <ThemedText preset="sm" style={styles.paragraph}>
            The Ionic Conference is a one-day event happening on{" "}
            {displayDate(conferenceDate, "MMM dd, yyyy")}, featuring talks from
            the Ionic team. The conference focuses on building applications with
            Ionic Framework, including topics such as app migration to the
            latest version, React best practices, Webpack, Sass, and other
            technologies commonly used in the Ionic ecosystem. Tickets are
            completely sold out, and we're expecting over 1,000 developers —
            making this the largest Ionic conference to date!
          </ThemedText>

          <ThemedText preset="lg" weight="bold" style={styles.sectionTitle}>
            Details
          </ThemedText>
          <ThemedView style={styles.list}>
            <ThemedView style={styles.listItem}>
              <ThemedText preset="sm">Location</ThemedText>
              <AboutLocationsMenu value={location} onSelect={setLocation} />
            </ThemedView>
            <TouchableOpacity
              style={styles.listItem}
              onPress={() => setShowDatePicker(true)}
            >
              <ThemedText preset="sm">Date</ThemedText>
              <DateTimePicker
                value={parseISO(conferenceDate)}
                mode="date"
                maximumDate={new Date("2056-12-31")}
                onChange={(event, date) => {
                  if (date) {
                    setConferenceDate(date.toISOString());
                    setShowDatePicker(false);
                  }
                }}
                style={styles.datePicker}
              />
            </TouchableOpacity>
          </ThemedView>

          <ThemedText preset="lg" weight="bold" style={styles.sectionTitle}>
            Internet
          </ThemedText>
          <ThemedView style={styles.list}>
            <ThemedView style={styles.listItem}>
              <ThemedText preset="sm">Wifi network</ThemedText>
              <ThemedText preset="sm" style={styles.textEnd}>
                ica{displayDate(conferenceDate, "y")}
              </ThemedText>
            </ThemedView>
            <ThemedView style={styles.listItem}>
              <ThemedText preset="sm">Password</ThemedText>
              <ThemedText preset="sm" style={styles.textEnd}>
                makegoodthings
              </ThemedText>
            </ThemedView>
          </ThemedView>
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  aboutHeader: {
    width: "100%",
    height: 200,
  },
  aboutInfo: {
    marginTop: -10,
    borderRadius: 10,
    padding: Platform.OS === "ios" ? 19 : 16,
    zIndex: 2,
  },
  sectionTitle: {
    marginTop: 0,
    marginBottom: 8,
    paddingHorizontal: Platform.OS === "ios" ? 0 : 16,
  },
  paragraph: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  list: {
    paddingTop: 0,
    paddingHorizontal: 16,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  textEnd: {
    textAlign: "right",
  },
  datePicker: {
    flex: 1,
  },
});

export default React.memo(AboutScreen);
