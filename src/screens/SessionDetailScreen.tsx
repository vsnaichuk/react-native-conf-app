import React from "react";
import {
  ScrollView,
  TouchableOpacity,
  Platform,
  StyleSheet,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useNavigation, useRoute, useTheme } from "@react-navigation/native";
import { RouteProp } from "@react-navigation/native";
import Icon from "@expo/vector-icons/Ionicons";
import { ThemedView } from "../components/themed/ThemedView";
import { ThemedText } from "../components/themed/ThemedText";
import { CustomTheme } from "../res/colors";
import { addFavorite, removeFavorite } from "../data/sessions/sessions.actions";
import { Session } from "../models/Schedule";
import { mockSessions } from "../data/mocks";
import { NavScreenProp } from "../navigation/types";

interface OwnProps {}

interface StateProps {
  session?: Session;
  favoriteSessions: number[];
}

interface DispatchProps {
  addFavorite: typeof addFavorite;
  removeFavorite: typeof removeFavorite;
}

type SessionDetailScreenProps = OwnProps & StateProps & DispatchProps;

const SessionDetailScreen: React.FC<SessionDetailScreenProps> = () => {
  const { colors } = useTheme() as CustomTheme;
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavScreenProp<"SessionDetail">>();
  const route = useRoute<RouteProp<{ params: { id: number } }>>();
  const { id } = route?.params ?? {};

  const session = mockSessions.find((session) => session.id === id);

  if (!session) {
    return (
      <SafeAreaView
        style={[styles.safeArea, { backgroundColor: colors.background }]}
      >
        <ThemedView style={styles.fullScreen}>
          <ThemedText preset="md" style={styles.notFound}>
            Session not found
          </ThemedText>
        </ThemedView>
      </SafeAreaView>
    );
  }

  const trackColors: Record<string, string> = {
    ionic: colors.primary,
    react: colors.react,
    communication: colors.communication,
    tooling: colors.tooling,
    services: colors.services,
    design: colors.design,
    workshop: colors.workshop,
    food: colors.food,
    documentation: colors.documentation,
    navigation: colors.navigation,
  };

  const actions = [
    {
      action: "Speaker",
      onPress: () => {
        navigation.navigate("SpeakerDetail", { id: 1 });
      },
    },
    { action: "Add to Calendar", onPress: () => {} },
    { action: "Mark as Unwatched", onPress: () => {} },
    { action: "Download Video", onPress: () => {} },
    { action: "Leave Feedback", onPress: () => {} },
  ];

  return (
    <ScrollView
      contentContainerStyle={[
        styles.contentContainer,
        {
          paddingBottom: insets.bottom,
          backgroundColor: colors.background,
        },
      ]}
    >
      <ThemedView style={styles.content}>
        <ThemedText preset="xxl" weight="semiBold" style={styles.title}>
          {session.name}
        </ThemedText>
        <ThemedView style={styles.tracksContainer}>
          {session.tracks.map((track) => {
            const trackColor = trackColors[track.toLowerCase()] || "gray";
            return (
              <ThemedView key={track} style={styles.trackTag} color="secondary">
                <ThemedText
                  preset="xs"
                  weight="medium"
                  style={{ color: trackColor }}
                >
                  {track}
                </ThemedText>
              </ThemedView>
            );
          })}
        </ThemedView>
        <ThemedText preset="sm" style={styles.description}>
          {session.description}
        </ThemedText>
        <ThemedText preset="xs" color="secondary">
          {session.timeStart} – {session.timeEnd}
          {"\n"}
          {session.location}
        </ThemedText>
      </ThemedView>
      <ThemedView
        style={[
          styles.actionsCard,
          {
            backgroundColor: colors.card || colors.white,
            borderBottomColor: colors.border,
          },
        ]}
      >
        {actions.map(({ action, onPress }, index, array) => (
          <TouchableOpacity
            key={action}
            style={[
              styles.actionButton,
              { borderBottomColor: colors.border },
              index === array.length - 1 && styles.lastActionButton,
            ]}
            onPress={onPress}
          >
            {action === "Download Video" ? (
              <ThemedView style={styles.downloadButton}>
                <ThemedText preset="sm" color="primary">
                  " {action}
                </ThemedText>
                <Icon name="cloud-download" size={18} color={colors.primary} />
              </ThemedView>
            ) : (
              <ThemedText preset="sm" color="primary">
                " {action}
              </ThemedText>
            )}
          </TouchableOpacity>
        ))}
      </ThemedView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  fullScreen: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  tracksContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 12,
  },
  title: {
    marginBottom: 8,
  },
  trackTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
    marginBottom: 8,
    borderRadius: 4,
  },
  description: {
    marginBottom: 12,
  },
  notFound: {
    textAlign: "center",
    marginTop: 20,
  },
  actionsCard: {
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 16,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  actionButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  lastActionButton: {
    borderBottomWidth: 0,
  },
  downloadButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default SessionDetailScreen;
