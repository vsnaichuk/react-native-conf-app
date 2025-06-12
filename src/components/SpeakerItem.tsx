import React from "react";
import { TouchableOpacity, Image, Platform, StyleSheet } from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";
import { CustomTheme } from "../res/colors";
import { Session } from "../models/Schedule";
import { Speaker } from "../models/Speaker";
import { NavScreenProp } from "../navigation/types";
import { ThemedText } from "./themed/ThemedText";
import { ThemedView } from "./themed/ThemedView";

interface SpeakerItemProps {
  speaker: Speaker;
  sessions: Session[];
}

const SpeakerItem: React.FC<SpeakerItemProps> = ({ speaker, sessions }) => {
  const { colors } = useTheme() as CustomTheme;
  const navigation = useNavigation<NavScreenProp<"SpeakerList">>();

  return (
    <ThemedView
      style={[
        styles.card,
        {
          backgroundColor: colors.card || colors.white,
        },
      ]}
    >
      <ThemedView style={styles.cardHeader}>
        <TouchableOpacity
          style={styles.speakerItem}
          onPress={() =>
            navigation.navigate("SpeakerDetail", { id: speaker.id })
          }
        >
          <Image
            source={{ uri: speaker.profilePic }}
            style={styles.avatar}
            accessibilityLabel="Speaker profile picture"
          />
          <ThemedView style={styles.speakerInfo}>
            <ThemedText preset="lg" weight="semiBold">
              {speaker.name}
            </ThemedText>
            <ThemedText preset="sm" color="textSecondary">
              {speaker.title}
            </ThemedText>
          </ThemedView>
        </TouchableOpacity>
      </ThemedView>

      <ThemedView style={styles.cardContent}>
        <ThemedView style={styles.list}>
          {sessions.map((session) => (
            <TouchableOpacity
              key={session.id}
              style={styles.listItem}
              onPress={() =>
                navigation.navigate("SessionDetail", { id: session.id })
              }
            >
              <ThemedText preset="sm">{session.name}</ThemedText>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={styles.listItem}
            onPress={() =>
              navigation.navigate("SpeakerDetail", { id: speaker.id })
            }
          >
            <ThemedText preset="sm">About {speaker.name}</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 8,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  cardHeader: {
    padding: 0,
  },
  speakerItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  speakerInfo: {
    flex: 1,
  },
  cardContent: {
    padding: 0,
  },
  list: {
    paddingVertical: 8,
  },
  listItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});

export default SpeakerItem;
