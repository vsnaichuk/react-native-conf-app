import React, { useLayoutEffect } from "react";
import {
  Platform,
  ScrollView,
  TouchableOpacity,
  Button,
  StyleSheet,
} from "react-native";
import Icon from "@expo/vector-icons/Ionicons";
import { connect } from "../data/connect";
import { updateFilteredTracks } from "../data/sessions/sessions.actions";
import { CustomTheme } from "../res/colors";
import { AppState } from "../data/state";
import { useNavigation, useTheme } from "@react-navigation/native";
import { NavScreenProp } from "../navigation/types";
import { ThemedText } from "../components/themed/ThemedText";
import { ThemedView } from "../components/themed/ThemedView";

interface OwnProps {
  visible: boolean;
  onDismissModal: () => void;
}

interface StateProps {
  allTracks: string[];
  filteredTracks: string[];
}

interface DispatchProps {
  updateFilteredTracks: (tracks: string[]) => void;
}

type SessionsFilterScreenProps = OwnProps & StateProps & DispatchProps;

const iconMap = {
  React: "logo-react",
  Documentation: "document",
  Food: "restaurant",
  Ionic: "logo-ionic",
  Tooling: "hammer",
  Design: "color-palette",
  Services: "cog",
  Workshop: "construct",
  Navigation: "compass",
  Communication: "call",
} as const;

const SessionsFilterScreen: React.FC<SessionsFilterScreenProps> = (props) => {
  const navigation = useNavigation<NavScreenProp<"SessionsFilter">>();
  const { colors } = useTheme() as CustomTheme;
  const ios = Platform.OS === "ios";
  const {
    allTracks = [],
    filteredTracks = [],
    updateFilteredTracks = () => {},
  } = props;

  const toggleTrackFilter = (track: string) => {
    if (filteredTracks.includes(track)) {
      updateFilteredTracks(filteredTracks.filter((x) => x !== track));
    } else {
      updateFilteredTracks([...filteredTracks, track]);
    }
  };

  const onDismiss = () => {
    navigation.goBack();
  };

  const onSubmit = () => {
    console.log("submit action");
    navigation.goBack();
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: ({ tintColor }) => (
        <Button title="Cancel" onPress={onDismiss} color={tintColor} />
      ),
      headerRight: ({ tintColor }) => (
        <Button title="Done" onPress={onSubmit} color={tintColor} />
      ),
    });
  }, [navigation]);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ThemedText preset="md" weight="semiBold" style={styles.listHeader}>
        Tracks
      </ThemedText>
      {allTracks.map((track) => (
        <TouchableOpacity
          key={track}
          style={[
            styles.listItem,
            {
              borderBottomColor: colors.border,
              backgroundColor: ios ? colors.white : colors.background,
            },
          ]}
          onPress={() => toggleTrackFilter(track)}
        >
          {ios && (
            <Icon
              name={iconMap[track as keyof typeof iconMap]}
              size={24}
              color={colors.primary}
              style={styles.listItemIcon}
            />
          )}
          <ThemedText preset="sm" style={styles.listItemText}>
            {track}
          </ThemedText>
          <ThemedView style={styles.checkbox}>
            {filteredTracks.includes(track) ? (
              <Icon name="checkbox" size={24} color={colors.primary} />
            ) : (
              <Icon name="square-outline" size={24} color={colors.primary} />
            )}
          </ThemedView>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listHeader: {
    marginTop: Platform.OS === "ios" ? 10 : 0,
    marginBottom: 8,
    marginLeft: 16,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: Platform.OS === "ios" ? 0 : 1,
    borderRadius: Platform.OS === "ios" ? 8 : 0,
    marginBottom: Platform.OS === "ios" ? 8 : 0,
    marginHorizontal: Platform.OS === "ios" ? 16 : 0,
  },
  listItemIcon: {
    marginRight: 12,
  },
  listItemText: {
    flex: 1,
  },
  checkbox: {
    marginLeft: 12,
  },
});

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state: AppState) => ({
    allTracks: state.data.allTracks,
    filteredTracks: state.data.filteredTracks,
  }),
  mapDispatchToProps: {
    updateFilteredTracks,
  },
  component: SessionsFilterScreen,
});
