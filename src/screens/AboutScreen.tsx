import React, { useLayoutEffect, useState } from "react";
import { ScrollView, Platform, StyleSheet, Image } from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";
import { format, parseISO } from "date-fns";
import { CustomTheme } from "../res/colors";
import AboutHeaderMenu from "../components/AboutHeaderMenu";
import AboutLocationsMenu from "../components/AboutLocationsMenu";
import { NavScreenProp } from "../navigation/types";
import { ThemedText } from "../components/themed/ThemedText";
import { ThemedView } from "../components/themed/ThemedView";
import { HeaderButton } from "@react-navigation/elements";
import { images } from "../res/images";
import { DatePickerField } from "../components/DatePickerField";

interface AboutProps {}

const AboutScreen: React.FC<AboutProps> = () => {
  const navigation = useNavigation<NavScreenProp<"About">>();
  const { colors } = useTheme() as CustomTheme;
  const [location, setLocation] = useState<
    "madison" | "austin" | "chicago" | "seattle"
  >("madison");
  const [conferenceDate, setConferenceDate] = useState(
    "2047-05-17T00:00:00-05:00"
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTintColor: colors.white,
      headerRight: (props) => (
        <HeaderButton {...props}>
          <AboutHeaderMenu tintColor={colors.white} />
        </HeaderButton>
      ),
    });
  });

  return (
    <ScrollView contentContainerStyle={{ backgroundColor: colors.background }}>
      <Image
        style={styles.aboutHeader}
        source={images.about_bg}
        resizeMode="cover"
      />
      <ThemedView style={styles.aboutInfo}>
        <ThemedText preset="lg" weight="bold" style={styles.sectionTitle}>
          About
        </ThemedText>
        <ThemedText preset="sm" style={styles.paragraph}>
          The Ionic Conference is a one-day event happening on{" "}
          {format(parseISO(conferenceDate), "MMM dd, yyyy")}, featuring talks
          from the Ionic team. The conference focuses on building applications
          with Ionic Framework, including topics such as app migration to the
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
          <ThemedView style={styles.listItem}>
            <ThemedText preset="sm">Date</ThemedText>
            <DatePickerField
              value={conferenceDate}
              onChange={setConferenceDate}
              maximumDate={new Date("2056-12-31")}
            />
          </ThemedView>
        </ThemedView>

        <ThemedText preset="lg" weight="bold" style={styles.sectionTitle}>
          Internet
        </ThemedText>
        <ThemedView style={styles.list}>
          <ThemedView style={styles.listItem}>
            <ThemedText preset="sm">Wifi network</ThemedText>
            <ThemedText preset="sm" style={styles.textEnd}>
              ica{format(parseISO(conferenceDate), "y")}
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  aboutHeader: {
    width: "100%",
    height: 300,
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
